import React, { useState, useEffect, useContext } from 'react'
import { AuthService, useAuth0 } from '@auth0/auth0-react'
// import { Link } from '@reach/router'
import { useStaticQuery, Link, graphql } from 'gatsby'

import UserContext from '../../context/userContext'

const Header = () => {
  console.log('useAuth0() :>> ', useAuth0())
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0()
  const { userName, setUserName } = useContext(UserContext)
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    if (user) {
      const { email, name, nickname, given_name, sub, aud, picture } = user
      const finalName = email || nickname || name || given_name
      if (finalName) {
        setUserName(finalName)
      }

      if (picture) {
        setUserAvatar(picture)
      }
    }
  }, [user])

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    // <header>
    //   <h2>HEADERrr</h2>
    // </header>

    <header>
      <div className='inner'>
        <Link to='/'>
          <h3>{data.site.siteMetadata.title}</h3>
        </Link>
        <div className='user-block'>
          {userAvatar && (
            <div className='avatar-container'>
              <img className='avatar-image' src={userAvatar} alt='' />
            </div>
          )}
          <div className='login-logout'>
            {isAuthenticated ? (
              <>
                {userName && <h4>{userName}</h4>}
                <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
              </>
            ) : (
              <button onClick={loginWithRedirect}>Login</button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
