import React, { Suspense, lazy, useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import firebase from './services/firebase'
import { AuthContext } from './contexts/auth'

const MainPage = lazy(() => import('./pages/main'))
const Login = lazy(() => import('./pages/login'))

function App () {
  const { setUserInfo } = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      setUserInfo({
        isUserLogedIn: !!user,
        user
      })
    })
  }, [])

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
