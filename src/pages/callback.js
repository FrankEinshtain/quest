import React from 'react'
import { handleAuthentication } from '../utils/auth'

const Callback = () => {
  handleAuthentication()
  console.log('callback component works!')

  return <p>Loading...</p>
}

export default Callback
