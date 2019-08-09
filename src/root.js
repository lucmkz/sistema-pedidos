import React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter, Route } from 'react-router-dom'
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import AuthProvider from './contexts/auth'
import App from './app'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

function Root () {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />

        <HashRouter>
          <Route component={App} />
        </HashRouter>
      </AuthProvider>
    </MuiThemeProvider>
  )
}

export default hot(module)(Root)
