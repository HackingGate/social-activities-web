import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Logo } from '../../components/auth/Logo'
import { OAuthButtonGroup } from '../../components/auth/OAuthButtonGroup'
import { PasswordField } from '../../components/auth/PasswordField'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

const SignUpMutation = gql`
  mutation SignUpMutation(
    $name: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    signupUser(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      id
      name
      username
      email
    }
  }
`

const SignUp: NextPage = (props: { csrfToken }) => {
  const [signUp] = useMutation(SignUpMutation)
  const [name, setName] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Sign up your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => {
                  signIn()
                }}
              >
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="text">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="text">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </FormControl>
              <PasswordField
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
            </HStack>
            <Stack spacing="6">
              <Button
                variant="primary"
                onClick={async (e) => {
                  await signUp({
                    variables: {
                      name,
                      username,
                      email,
                      password,
                    },
                  })
                  signIn('credentials', {
                    usernameOrEmail: username || email,
                    password: password,
                    callbackUrl: '/',
                  })
                }}
              >
                Sign up
              </Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default SignUp
