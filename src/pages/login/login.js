import React from 'react'
import styled from 'styled-components'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as Logo } from './logo-react-zzaria.svg'

const Login = () => (
  <Container>
    <Grid container direction='column' alignItems='center' spacing={10}>
      <Grid iten>
        <Logo />
      </Grid>

      <Grid iten>
        <Button>Entrar com GitHub</Button>
      </Grid>
    </Grid>
  </Container>
)

const Container = styled.div`
  padding: 80px
`

export default Login
