import React from 'react'
import { AuthService, useAuth } from 'gatsby-theme-auth0'
import { navigate } from 'gatsby'
// import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { isLoggedIn, profile } = useAuth()
  // const { loginWithRedirect } = useAuth0()
  console.log('profile :>> ', profile)
  {
    isLoggedIn ? (
      <button onClick={AuthService.logout}>Logout</button>
    ) : (
      <button onClick={AuthService.login}>Login</button>
    )
  }
  // return <button onClick={() => loginWithRedirect()}>Log In</button>
  // return <button onClick={(e) => console.log('LoginButton E: ', e)}>Log In</button>
}

export default LoginButton
