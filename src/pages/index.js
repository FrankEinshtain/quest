import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { graphql, Link, PageProps } from 'gatsby'
import { Router } from '@reach/router'
// import { login, isAuthenticated, getProfile } from '../utils/auth'
import * as styles from '../scss/Index.module.scss'

import { Layout } from '../components/shared/Layout'
import NotAuthorizedBlock from '../components/NotAuthorizedBlock'
import TheGame from './thegame'

const IndexPage = ({ data, path }) => {
  const { name, tagline } = data.site.siteMetadata

  // const user = getProfile()

  return (
    <Layout>
      <div className={styles.Container}>
        <h1>{name}</h1>
        <h2>{tagline}</h2>
        <p>Gatsby supports TypeScript by default!</p>
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
