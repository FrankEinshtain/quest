import React from 'react'
// import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  // const { loginWithRedirect } = useAuth0()
  // console.log('loginWithRedirect :>> ', loginWithRedirect)

  // return <button onClick={() => loginWithRedirect()}>Log In</button>
  return <button onClick={(e) => console.log('LoginButton E: ', e)}>Log In</button>
}

export default LoginButton
