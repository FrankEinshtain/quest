import React from 'react'
import { graphql } from 'gatsby'
// import { graphql, Link, PageProps } from 'gatsby'
// import { Router } from '@reach/router'
// import { login, isAuthenticated, getProfile } from '../utils/auth'
import { Layout } from '../components/shared/Layout'

const THeGame = ({ user }) => {
  return (
    <>
      <p>Hi, {user.profile.nickname ? user.profile.nickname : 'friend'}!</p>
      <pre>{JSON.stringify(user.profile, null, 2)}</pre>
    </>
  )
}

// const Settings = () => <p>Settings</p>
// const Billing = () => <p>Billing</p>

const TheGame = ({ data }) => {
  return (
    <Layout>
      <h2>thegame</h2>
      {/* <nav>
        <Link to='/account/'>Home</Link> <Link to='/account/settings/'>Settings</Link>{' '}
        <Link to='/account/billing/'>Billing</Link>{' '}
      </nav>
      <Router>
        <Home path='/account/' user={user} />
        <Settings path='/account/settings' />
        <Billing path='/account/billing' />
      </Router> */}
      {/* <Router>
        <PrivateRoute component={Home} path='/thegame' />
        <PrivateRoute component={Settings} path='/thegame/settings' />
        <PrivateRoute component={Billing} path='/thegame/billing' />
      </Router> */}
    </Layout>
  )
}

export default TheGame

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
