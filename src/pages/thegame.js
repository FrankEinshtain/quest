import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { Router } from '@reach/router'
import { Layout } from '../components/shared/Layout'

const Home = ({ user }) => {
  return (
    <>
      <p>Hi, {user.profile.nickname ? user.profile.nickname : 'friend'}!</p>
      <pre>{JSON.stringify(user.profile, null, 2)}</pre>
    </>
  )
}

const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const TheGame = ({ data }) => {
  return (
    <Layout>
      <Router>
        <PrivateRoute component={Home} path='/thegame' />
        <PrivateRoute component={Settings} path='/thegame/settings' />
        <PrivateRoute component={Billing} path='/thegame/billing' />
      </Router>
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
