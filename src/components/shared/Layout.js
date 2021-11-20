import React from 'react'
// import { Link } from '@reach/router'
import { useStaticQuery, Link, graphql } from 'gatsby'
import UserContext, { UserContextProvider } from '../../context/userContext'
import Seo from '../Seo'
import Header from './Header'
import Footer from './Footer'

const isBrowser = typeof window !== 'undefined'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  // const session = React.useContext(SessionContext)
  // UserContextProvider
  return (
    isBrowser && (
      <>
        <Seo />
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
  )
}

export default Layout
