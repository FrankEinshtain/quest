import auth0 from 'auth0-js'

import { navigate } from 'gatsby'
// import { WebAuth, AuthOptions, Auth0DecodedHash, Auth0Callback, Auth0Error } from 'auth0-js'

const isBrowser = typeof window !== 'undefined'

const auth = isBrowser
  ? auth0.WebAuth({
      domain: process.env.GATSBY_AUTH0_DOMAIN,
      clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
      redirectUri: process.env.GATSBY_AUTH0_CALLBACK_URL,
      responseType: 'token id_token',
      //   scope: 'openid profile email',
    })
  : {}

// // type authProps = {
// //   domain: string | undefined
// //   clientID: string | undefined
// //   redirectUri: string | undefined
// //   responseType: string | undefined
// //   scope: string | undefined
// // }

// const auth = () => {
//   console.log('WebAuth GATSBY_APP_DOMAIN :>> ', process.env.GATSBY_APP_DOMAIN)
//   const { GATSBY_APP_DOMAIN, GATSBY_APP_AUTH0_CLIENT_ID, GATSBY_APP_BASE_URL } = process.env
//   if (!GATSBY_APP_DOMAIN || !GATSBY_APP_AUTH0_CLIENT_ID) {
//     throw new Error('auth argumesnts missing')
//   }
//   const authOpts = {
//     domain: GATSBY_APP_DOMAIN,
//     clientID: GATSBY_APP_AUTH0_CLIENT_ID,
//     redirectUri: GATSBY_APP_BASE_URL,
//     responseType: 'token id_token',
//     scope: 'openid profile email',
//   }
//   return new auth0.WebAuth(authOpts)
// }

// const instance = auth()

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem('isLoggedIn') === 'true'
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  auth.authorize()
}

const setSession =
  (cb = () => {}) =>
  (err, authResult) => {
    if (err) {
      navigate('/')
      cb()
      return
    }

    authResult && console.log('authResult :>> ', authResult)

    if (authResult && authResult.accessToken && authResult.idToken) {
      let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
      tokens.accessToken = authResult.accessToken
      tokens.idToken = authResult.idToken
      tokens.expiresAt = expiresAt
      user = authResult.idTokenPayload
      localStorage.setItem('isLoggedIn', true)
      navigate('/thegame')
      cb()
    }
  }

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}

export const silentAuth = (callback = () => {}) => {
  if (!isAuthenticated()) return callback()
  auth.checkSession({}, setSession(callback))
}

// let user = {}

// export const isAuthenticated = () => {
//   if (!isBrowser) {
//     return
//   }

//   return localStorage.getItem('isLoggedIn') === '1'
// }

// export const login = () => {
//   if (!isBrowser) {
//     return
//   }
//   const authInstance = auth()
//   authInstance.authorize()
// }

// const setSession = (cb) => (err, authResult) => {
//   if (err) {
//     navigate('/')
//     cb()
//     return
//   }

//   if (authResult && authResult.accessToken && authResult.idToken) {
//     if (typeof authResult.expiresIn !== 'undefined') {
//       let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
//       tokens.accessToken = authResult.accessToken
//       tokens.idToken = authResult.idToken
//       tokens.expiresAt = expiresAt
//       user = authResult.idTokenPayload
//       localStorage.setItem('isLoggedIn', '1')
//       navigate('/thegame')
//       cb()
//     }
//   }
// }

// export const silentAuth = (callback = () => {}) => {
//   if (!isAuthenticated()) return callback()
//   instance.checkSession({}, setSession(callback))
// }

// export const handleAuthentication = () => {
//   if (!isBrowser) {
//     return
//   }

//   instance.parseHash(setSession())
// }

// export const getProfile = () => {
//   return user
// }

// export const logout = () => {
//   localStorage.removeItem('isLoggedIn')
//   instance.logout()
// }
