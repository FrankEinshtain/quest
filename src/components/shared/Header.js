import React, { useState, useEffect, useMemo, useContext } from 'react'
import { AuthService, useAuth0 } from '@auth0/auth0-react'
// import { Link } from '@reach/router'
import { useStaticQuery, Link, graphql } from 'gatsby'

import { UserGettersContext, UserSettersContext } from '../../context/userContext'
const Header = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0()

  const { userInfo } = useContext(UserGettersContext)
  // const { setUserInfo } = useContext(UserSettersContext)
  const [userName, setUserName] = useState(() => userInfo?.name)
  const [avatar, setAvatar] = useState(() => userInfo?.avatar)

  // useEffect(() => {
  //   console.log('header userName :>> ', userName)
  // }, [userName])

  // useEffect(() => {
  //   console.log('header avatar :>> ', avatar)
  // }, [avatar])

  useEffect(() => {
    if (userInfo) {
      if (userInfo.name && !userName) {
        setUserName(userInfo.name)
      }
      if (userInfo.avatar && !avatar) {
        setAvatar(userInfo.avatar)
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (user) {
      const { email, name, nickname, given_name, sub, aud, picture } = user
      const finalName = nickname || name || given_name || email
      if (finalName) {
        setUserName(finalName)
      }

      if (picture) {
        setAvatar(picture)
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
    <div>
      <header>
        <div className='inner'>
          <Link to='/'>
            <h3>{data.site.siteMetadata.title}</h3>
          </Link>
          <div className='user-block'>
            {avatar && (
              <div className='avatar-container'>
                <img className='avatar-image' src={avatar} alt='' />
              </div>
            )}
            <div className='login-logout'>
              {isAuthenticated ? (
                <>
                  {userName && <h4>{userName}</h4>}
                  <button onClick={() => logout({ returnTo: window.location.origin })}>
                    Logout
                  </button>
                </>
              ) : (
                <button disabled={isLoading} onClick={loginWithRedirect}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
