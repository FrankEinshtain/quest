import './src/scss/_main.scss'
import React, { useState, useEffect } from 'react'
import { UserContextProvider } from './src/context/userContext'
import Layout from './src/components/shared/Layout'
import { silentAuth } from './src/utils/auth'

const isBrowser = typeof window !== 'undefined'

export const SessionCheck = ({ children }) => {
  const [isGatsbyBrowserLoading, setIsGatsbyBrowserLoading] = useState(true)

  const handleCheckSession = () => {
    setIsGatsbyBrowserLoading(false)
  }

  useEffect(() => {
    if (isBrowser) {
      console.log('SessionCheck before silentAuth :>> ')
      silentAuth(handleCheckSession)
    }
  })

  return isGatsbyBrowserLoading ? (
    <div>
      <h2>gatsby-browser Loading..</h2>
    </div>
  ) : (
    <>{children}</>
  )
}

export const wrapPageElement = ({ element }) => (
  <SessionCheck>
    <UserContextProvider>
      <Layout>{element}</Layout>
    </UserContextProvider>
  </SessionCheck>
)
