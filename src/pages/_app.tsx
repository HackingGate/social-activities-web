import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api',
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <SessionProvider session={session} refetchInterval={5 * 60}>
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
