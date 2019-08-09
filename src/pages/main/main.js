import React, { Suspense } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Header from './header'
import { HOME, CHOOSE_PIZZA_FLAVOURS } from 'routes'

const ChoosePizzaSize = React.lazy(() => import('pages/choose-pizza-size'))
const ChoosePizzaFlavours = React.lazy(() => import('pages/choose-pizza-flavours'))

const Main = () => {
  return (
    <>
      <Header />

      <Spacer />

      <Content>
        <Suspense fallback='loading'>
          <Switch>
            <Route path={HOME} exact component={ChoosePizzaSize}/>
            <Route path={CHOOSE_PIZZA_FLAVOURS} component={ChoosePizzaFlavours}/>
          </Switch>
        </Suspense>
      </Content>
    </>
  )
}

const Content = styled.main`
  padding: 20px;
  padding: 20px;
`
const style = (theme) => {
  return {
    main: theme.mixins.toolbar
  }
}
const spacerWraper = ({ classes }) => (
  <div className={classes.main} />
)

const Spacer = withStyles(style)(spacerWraper)

export default Main
