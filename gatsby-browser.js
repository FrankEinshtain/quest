import './src/scss/_main.scss'
// window.fbAsyncInit = function () {
//   window.FB &&
//     window.FB.init({
//       appId: process.env.GATSBY_FACEBOOK_APP_ID,
//       cookie: true,
//       xfbml: true,
//       version: 'v12.0',
//     })

//   window.FB.AppEvents.logPageView()
// }
// ;(function (d, s, id) {
//   var js,
//     fjs = d.getElementsByTagName(s)[0]
//   if (d.getElementById(id)) {
//     return
//   }
//   js = d.createElement(s)
//   js.id = id
//   js.src = 'https://connect.facebook.net/en_US/sdk.js'
//   fjs.parentNode.insertBefore(js, fjs)
// })(document, 'script', 'facebook-jssdk')

import React, { useState, useEffect } from 'react'
import { silentAuth } from './src/utils/auth'

// const SessionCheck = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true)

//   const handleCheckSession = () => {
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     silentAuth(handleCheckSession)
//   })

//   return isLoading === false && <>{children}</>
// }

// export const wrapRootElement = ({ children }) => {
//   return <SessionCheck>{children}</SessionCheck>
// }

// ///////////////////////////////////////////

class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    return this.state.loading === false && <React.Fragment>{this.props.children}</React.Fragment>
  }
}
