import './src/scss/_main.scss'

// import React, { useState, useEffect } from 'react'
// import { silentAuth } from './src/utils/auth'

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

// class SessionCheck extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       loading: true,
//     }
//   }

//   handleCheckSession = () => {
//     this.setState({ loading: false })
//   }

//   componentDidMount() {
//     silentAuth(this.handleCheckSession)
//   }

//   render() {
//     return this.state.loading === false && <React.Fragment>{this.props.children}</React.Fragment>
//   }
// }
