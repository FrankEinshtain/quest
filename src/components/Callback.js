import React, { useEffect, useState } from 'react'
// import { handleAuthentication } from '../../utils/auth'

import { useAuth } from 'gatsby-theme-auth0'

const Callback = () => {
  // handleAuthentication()
  const { isLoading, isLoggedIn, profile } = useAuth()

  useEffect(() => {
    console.log('Callback component isLoading :>> ', isLoading)
    console.log('Callback component isLoggedIn :>> ', isLoggedIn)
    console.log('Callback component profile :>> ', profile)
  })

  return <p>Callback component</p>
}

export default Callback
