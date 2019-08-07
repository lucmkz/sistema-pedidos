import React, { Suspense, lazy, useContext, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import firebase from './services/firebase'
import { AuthContext } from './contexts/auth'

const MainPage = lazy(() => import('./pages/main'))
const Login = lazy(() => import('./pages/login'))

function App ({ location }) {
  const { userInfo, setUserInfo, logout } = useContext(AuthContext)
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)

  const { isUserLogedIn } = userInfo

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      setUserInfo({
        isUserLogedIn: !!user,
        user
      })
      setDidCheckUserIn(true)
    })
    window.logout = logout
  }, [])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLogedIn && location.pathname === '/login') {
    return <Redirect to='/' />
  }

  if (!isUserLogedIn && location.pathname !== '/login') {
    return <Redirect to='/login' />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={MainPage} />
      </Switch>
    </Suspense>
  )
}

export default App
