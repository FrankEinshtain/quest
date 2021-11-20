import React, { useState, useEffect, useContext } from 'react'
import { Link } from '@reach/router'

const Footer = () => {
  // const { userName, setUserName } = useContext(UserContext)
  // const { isLoading, isLoggedIn = false, profile } = useAuth()

  // useEffect(() => {
  //   if (profile) {
  //     const { nickname, name, given_name, email } = profile
  //     const finalName = nickname || name || given_name || email
  //     setUserName(finalName)
  //   }
  // }, [profile])

  return (
    <footer>
      <div className='inner'>
        <Link to='/'>
          <h3>2021</h3>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
