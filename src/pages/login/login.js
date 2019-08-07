import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import firebase from '../../services/firebase'
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../contexts/auth'
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg'

let logoutFunction = null

function Login () {
  const { login } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState({
    isUserLogedIn: false,
    user: null
  })

  const { isUserLogedIn, user } = userInfo

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserInfo({
        isUserLogedIn: !!user,
        user
      })
    })
  }, [])

  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      setUserInfo({ isUserLogedIn: false, user: null })
    })
  }, [])

  if (!logoutFunction) {
    logoutFunction = logout
  }

  console.log(logoutFunction === logout)

  return (
    <Container>
      <Grid container justify='center' spacing={7}>
        <Grid item>
          <Logo />
        </Grid>

        <Grid item xs={12} container justify='center'>
          {isUserLogedIn && (
            <>
              <pre>{user.displayName}</pre>
              <Button variant='contained' onClick={logout}>
                Sair
              </Button>
            </>
          )}

          {!isUserLogedIn && (
            <GitHubButton onClick={login}>
              Entrar com GitHub
            </GitHubButton>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

const Logo = styled(MainLogo)`
  width: 100%;
`

const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  && {
    max-width: 420px;
    font-size: 25px;
    padding: 15px;
    text-transform: none;
  }
`

export default Login
