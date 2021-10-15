import * as React from 'react'
// import { Switch, Route, Redirect } from 'react-router-dom'
import { graphql, Link } from 'gatsby'
import { AuthService, useAuth } from 'gatsby-theme-auth0'
// import { Router } from '@reach/router'
// import { login, isAuthenticated, getProfile } from '../utils/auth'
// import
// import * as styles from '../scss/_Index.module.scss'

import { Layout } from '../components/shared/Layout'
// import NotAuthorizedBlock from '../components/NotAuthorizedBlock'
// import TheGame from './thegame'

const IndexPage = ({ data, path }) => {
  const { name, tagline } = data.site.siteMetadata

  const { isLoggedIn, profile } = useAuth()
  const [authName, setAuthName] = React.useState(null)
  const [authId, setAuthId] = React.useState(null)
  const [currentProfile, setCurrentProfile] = React.useState(profile)

  React.useEffect(() => {
    setCurrentProfile(profile)
  }, [profile])

  React.useEffect(() => {
    console.log('window :>> ', window)

    if (window && window.FB) {
      if (!authName) {
        window.FB.login(function (response) {
          console.log('login response,\n', response)
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ')
            window.FB.api('/me', function (response) {
              console.log('Good to see you,\n', response)
              if (response.name && response.id) {
                console.log('isLoggedIn :>> ', isLoggedIn)
                setAuthName(response.name)
                setAuthId(response.id)
              }
            })
          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
        })
      }
    }
  })
  // const user = getProfile()

  return (
    <Layout>
      <div className='content'>
        {authName && <h1>{authName}</h1>}
        <h2>{tagline}</h2>
        {isLoggedIn ? (
          <button onClick={AuthService.logout}>Logout</button>
        ) : (
          <button onClick={AuthService.login}>Login</button>
        )}
        <Link to='/'>Go back to the homepage</Link>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
      siteMetadata {
        name
        tagline
      }
    }
  }
`

// type LayoutProps = {
//   site: {
//     buildTime: string
//     siteMetadata: {
//       name: string
//       tagline: string
//     }
//   }
// }

// GATSBY_FACEBOOK_APP_ID = 398278374962838
