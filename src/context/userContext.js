import React, { useState, useEffect, useContext } from 'react'

// const defaultState = {
//   dark: false,
//   toggleDark: () => {},
// }

const UserContext = React.createContext()

export const UserContextProvider = (props) => {
  const [userName, setUserName] = useState('qwerty')
  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
