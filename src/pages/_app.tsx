import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
