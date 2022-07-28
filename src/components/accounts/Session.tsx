import { useSession, signIn, signOut } from 'next-auth/react'

export default function Session() {
  const { data: session } = useSession()
  if (session) {
    const { accessToken } = session
    return (
      <>
        Signed in as {session.user.email} <br />
        Access Token: {accessToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
