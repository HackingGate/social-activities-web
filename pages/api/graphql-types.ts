import { DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod, nonNull, nullable, objectType, stringArg } from 'nexus'
import prisma from '../../lib/prisma'

export const GQLDate = asNexusMethod(DateTimeResolver, 'date')

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('email')
    t.string('name')
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent) =>
        prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .posts(),
    })
  },
})

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.string('id')
    t.string('title')
    t.nullable.string('body')
    t.boolean('published')
    t.nullable.field('author', {
      type: 'User',
      resolve: (parent) =>
        prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .author(),
    })
  },
})

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.post.findUnique({
          where: { id: args.postId },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (_parent, _args) => {
        return prisma.post.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('drafts', {
      type: 'Post',
      resolve: (_parent, _args, ctx) => {
        return prisma.post.findMany({
          where: { published: false },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: nullable(stringArg()),
      },
      resolve: (_, { searchString }, ctx) => {
        return prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { body: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }, ctx) => {
        return prisma.user.create({
          data: {
            name,
            email,
          },
        })
      },
    })

    t.nullable.field('deletePost', {
      type: 'Post',
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return prisma.post.delete({
          where: { id: postId },
        })
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, body, authorEmail }, ctx) => {
        return prisma.post.create({
          data: {
            title,
            body,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.nullable.field('publish', {
      type: 'Post',
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return prisma.post.update({
          where: { id: postId },
          data: { published: true },
        })
      },
    })
  },
})
