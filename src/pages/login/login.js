import React, { PureComponent } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg'

var firebaseConfig = {
  apiKey: 'AIzaSyCZ4fuGJyXh25M5NonyG2CvknO20S0FyfQ',
  authDomain: 'reactzzaria-c030e.firebaseapp.com',
  databaseURL: 'https://reactzzaria-c030e.firebaseio.com',
  projectId: 'reactzzaria-c030e',
  storageBucket: '',
  messagingSenderId: '563457483452',
  appId: '1:563457483452:web:2652f9d4e79d0922'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

class Login extends PureComponent {
  state = {
    isUserLogedIn: false,
    user: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isUserLogedIn: !!user,
        user
      })
    })
  }

  login () {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('deslogou')
      this.setState({ isUserLogedIn: false, user: null })
    })
  }

  render () {
    const { isUserLogedIn, user } = this.state

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
                <Button variant='contained' onClick={this.logout}>
                  Sair
                </Button>
              </>
            )}

            {!isUserLogedIn && (
              <GitHubButton onClick={this.login}>
                Entrar com GitHub
              </GitHubButton>
            )}
          </Grid>
        </Grid>
      </Container>
    )
  }
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
