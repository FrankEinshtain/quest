// import auth0 from 'auth0-js'
// import { navigate } from 'gatsby'
import { AuthService, useAuth } from 'gatsby-theme-auth0'

const isBrowser = typeof window !== 'undefined'

export const silentAuth = async (callback = () => {}) => {
  if (!isBrowser) {
    return
  }
  if (!AuthService.isAuthenticated()) {
    return callback()
  } else {
    // const _checkSession = await AuthService.checkSession()
    // console.log('_checkSession :>> ', _checkSession)
    return callback()
  }
}
