import React, { useState, useEffect, useContext } from 'react'
// import { Switch, Route, Redirect } from 'react-router-dom'
// import { Router, Link, Default } from '@reach/router'
import { graphql, Link } from 'gatsby'
// import { AuthService, useAuth } from 'gatsby-theme-auth0'
// import { login, isAuthenticated, getProfile } from '../utils/auth'
// import UserContext from '../context/userContext'

const isBrowser = typeof window !== 'undefined'

const IndexPage = ({ data, path }) => {
  // const { name, tagline } = data.site.siteMetadata
  // const { isLoading, isLoggedIn = false, profile = null } = useAuth()

  return (
    isBrowser && (
      <div className='home-inner'>
        <h1>HomePage - index</h1>
        <Link to='/thegame'>thegame</Link>
      </div>
    )
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
