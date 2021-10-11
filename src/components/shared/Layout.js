import React from 'react'
// import { SessionContext } from 'gatsby-theme-auth0'
import { Header } from './Header'

export const Layout = ({ children }) => {
  // const session = React.useContext(SessionContext)
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     minHeight: '100vh',
    //     padding: '20px',
    //     flexDirection: 'column',
    //     boxSizing: 'border-box',
    //   }}
    // >
    <>
      <Header />
      <main>{children}</main>
      <footer>FooTer</footer>
    </>
    // </div>
  )
}

// import * as React from 'react'
// // import { graphql, Link, PageProps } from 'gatsby'
// // import * as styles from '../../scss/components/Layout.module.scss'
// import Seo from '../Seo'

// interface LayoutProps {
//   children: React.ReactChild | React.ReactChildren | JSX.Element[]
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <>
//       <Seo />
//       <div>
//         <header>Header</header>
//         {children}
//         <footer>Footer</footer>
//       </div>
//     </>
//   )
// }

// export default Layout
