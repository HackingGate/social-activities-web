import { ApolloServer } from 'apollo-server-micro'
import { Query, Mutation, Post, User, GQLDate } from './graphql-types'
import { NextApiHandler } from 'next'
import cors from 'micro-cors'
import { makeSchema } from 'nexus'
import path from 'path'

const schema = makeSchema({
  types: [Query, Mutation, Post, User, GQLDate],
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
})

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler() {
  const apolloServer = new ApolloServer({ schema })

  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: '/api',
    })
  }

  return apolloServerHandler
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const graphqlHandler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(graphqlHandler)
