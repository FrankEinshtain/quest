import './src/scss/_main.scss'
import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { navigate } from 'gatsby'
import Layout from './src/components/shared/Layout'

const isBrowser = typeof window !== 'undefined'

const onRedirectCallback = (appState) => {
  console.log('\n\n#####\nonRedirectCallback appState :>> ', appState)
  navigate(appState?.returnTo || '/', { replace: true })
}

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      scope={process.env.GATSBY_AUTH0_SCOPE}
      audience={process.env.GATSBY_AUTH0_JWT_AUDIENCE}
      useRefreshTokens={true}
      // redirectUri={process.env.GATSBY_AUTH0_CALLBACK_URL}
      onRedirectCallback={onRedirectCallback}
    >
      <Layout>{element}</Layout>
    </Auth0Provider>
  )
}
