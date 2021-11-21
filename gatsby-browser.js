import './src/scss/_main.scss'
import React, { useState, useEffect } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { navigate } from 'gatsby'
import { UserContextProvider } from './src/context/userContext'
import Layout from './src/components/shared/Layout'
// import { silentAuth } from './src/utils/auth'

const isBrowser = typeof window !== 'undefined'

const onRedirectCallback = (appState) => {
  navigate(appState?.returnTo || '/', { replace: true })
}

// export const SessionCheck = ({ children }) => {
//   const [isGatsbyBrowserLoading, setIsGatsbyBrowserLoading] = useState(true)

//   const handleCheckSession = () => {
//     setIsGatsbyBrowserLoading(false)
//   }

//   useEffect(() => {
//     if (isBrowser) {
//       console.log('SessionCheck before silentAuth :>> ')
//       silentAuth(handleCheckSession)
//     }
//   })

//   return isGatsbyBrowserLoading ? (
//     <div>
//       <h2>gatsby-browser Loading..</h2>
//     </div>
//   ) : (
//     <>{children}</>
//   )
// }

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      // redirectUri={process.env.GATSBY_AUTH0_CALLBACK_URL}
      onRedirectCallback={onRedirectCallback}
    >
      <UserContextProvider>
        <Layout>{element}</Layout>
      </UserContextProvider>
    </Auth0Provider>
  )
}

// export const wrapPageElement = ({ element }) => (
//   <SessionCheck>
//     <UserContextProvider>
//       <Layout>{element}</Layout>
//     </UserContextProvider>
//   </SessionCheck>
// )
