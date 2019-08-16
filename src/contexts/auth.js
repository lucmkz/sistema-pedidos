import React, { createContext, useCallback, useState } from 'react'
import firebase from '../services/firebase'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLogedIn: false,
    user: null
  })

  const login = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }, [])

  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      setUserInfo({ isUserLogedIn: false, user: null })
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userInfo,
      setUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
