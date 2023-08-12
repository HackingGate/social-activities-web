import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

const FeedQuery = gql`
  query FeedQuery {
    feed {
      id
      title
      body
      published
      user {
        id
        name
        email
        passwordResets {
          id
          token
        }
        posts {
          id
          title
        }
      }
    }
  }
`

const Post = ({ post }) => (
  <Link href="/p/[id]" as={`/p/${post.id}`}>
    <h2>{post.title}</h2>
    <small>By {post.user.name}</small>
    <p>{post.body}</p>
  </Link>
)

const NewestPosts = () => {
  const { loading, error, data } = useQuery(FeedQuery, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return <div>Loading ...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      {data.feed.map((post) => (
        <div key={post.id} className="post">
          <Post post={post} />
        </div>
      ))}
    </div>
  )
}

export default NewestPosts
