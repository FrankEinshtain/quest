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
  console.log('profile :>> ', profile)

  React.useEffect(() => {
    console.log('window :>> ', window)
    // window.fbAsyncInit({
    //   appId: process.env.GATSBY_FACEBOOK_APP_ID,
    //   version: 'v2.7',
    // })
    window.FB &&
      window.FB.getLoginStatus(function (response) {
        console.log('FB getLoginStatus response :>> ', response)
        // statusChangeCallback(response)
      })
  })

  // const user = getProfile()

  return (
    <Layout>
      <div className='content'>
        <h1>{name}</h1>
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
