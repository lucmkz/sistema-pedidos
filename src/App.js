import React, { Suspense, lazy, useContext, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import firebase from './services/firebase'
import { AuthContext } from './contexts/auth'

import { HOME, LOGIN } from 'routes'

const MainPage = lazy(() => import('./pages/main'))
const Login = lazy(() => import('./pages/login'))

function App ({ location }) {
  const { userInfo, setUserInfo } = useContext(AuthContext)
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)

  const { isUserLogedIn } = userInfo

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      setUserInfo({
        isUserLogedIn: !!user,
        user: user && {
          ...user,
          firstName: user.displayName.split(' ')[0]
        }
      })
      setDidCheckUserIn(true)
    })
  }, [setUserInfo])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLogedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />
  }

  if (!isUserLogedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route path={HOME} component={MainPage} />
      </Switch>
    </Suspense>
  )
}

export default App
