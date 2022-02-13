import React, { useState, useEffect, useContext, useReducer } from 'react'

// import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'REGISTER_USER':
//       return {
//         ...state,
//         isLoading: true,
//       }
//     case 'START_THE_GAME':
//       return {
//         ...state,
//         isAuthenticated: !!action.user,
//         user: action.user,
//         isLoading: false,
//         error: undefined,
//       }
//     case 'ANSWER_THE_QUESTION':
//       return {
//         ...state,
//         isLoading: false,
//         error: action.error,
//       }
//   }
// }

export const UserGettersContext = React.createContext()
export const UserSettersContext = React.createContext()

// export const UserContextProvider = (props) => {
//   const initialState = {
//     token: null,
//     userInfo: null,
//     questions: [],
//   }

//   const [state, dispatch] = useReducer(reducer, initialState)

//   return (
//       <UserGettersContext.Provider
//         value={state}
//       >
//     <UserSettersContext.Provider
//       value={dispatch}
//     >
//         {props.children}
//     </UserSettersContext.Provider>
//       </UserGettersContext.Provider>
//   )

// }

export const UserContextProvider = (props) => {
  // const {
  //   isLoading,
  //   isAuthenticated,
  //   error,
  //   user,
  //   loginWithRedirect,
  //   getAccessTokenSilently,
  //   logout,
  // } = useAuth0()

  const [token, setToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [questions, setQuestions] = useState([])

  return (
    <UserSettersContext.Provider
      value={{
        setToken,
        setUserInfo,
        setQuestions,
      }}
    >
      <UserGettersContext.Provider
        value={{
          token,
          userInfo,
          questions,
        }}
      >
        {props.children}
      </UserGettersContext.Provider>
    </UserSettersContext.Provider>
  )
}

// export default UserContext
