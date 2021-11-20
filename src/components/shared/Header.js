import React, { useState, useEffect, useContext } from 'react'
import { AuthService, useAuth } from 'gatsby-theme-auth0'
// import { Link } from '@reach/router'
import { useStaticQuery, Link, graphql } from 'gatsby'

import UserContext from '../../context/userContext'

const Header = () => {
  const { isLoading, isLoggedIn = false, profile } = useAuth()
  const { userName, setUserName } = useContext(UserContext)
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    if (profile) {
      const { email, name, nickname, given_name, sub, aud, picture } = profile
      const finalName = email || nickname || name || given_name
      if (finalName) {
        setUserName(finalName)
      }

      if (picture) {
        setUserAvatar(picture)
      }
    }
  }, [profile])

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
            {isLoggedIn ? (
              <>
                {userName && <h4>{userName}</h4>}
                <button onClick={AuthService.logout}>Logout</button>
              </>
            ) : (
              <button onClick={AuthService.login}>Login</button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
