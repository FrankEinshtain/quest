import React from 'react'
import { SessionContext } from 'gatsby-theme-auth0-ts'
import { Link } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

export const Header = () => {
  const session = React.useContext(SessionContext)

  const {
    user,
    auth: { authorize, logout },
  } = session
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
      <Link to='/'>
        <h1>{data.site.siteMetadata.title}</h1>
      </Link>
      <nav>
        {user.isLoggedIn ? (
          <>
            <Link to='/thegame'>The Game</Link>
            <Link to='/thegame/settings'>Settings</Link>
            <Link to='/thegame/billing'>Billing</Link>
            <button onClick={() => logout()}>Log Out</button>
          </>
        ) : (
          <button onClick={() => authorize()}>Log In</button>
        )}
      </nav>
    </header>
  )
}
