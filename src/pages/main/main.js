import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles, LinearProgress } from '@material-ui/core'
import Header from './header'
import { HOME, CHOOSE_PIZZA_FLAVOURS } from 'routes'

const ChoosePizzaSize = React.lazy(() => import('pages/choose-pizza-size'))
const ChoosePizzaFlavours = React.lazy(() => import('pages/choose-pizza-flavours'))

const Main = () => {
  return (
    <>
      <Header />

      <Spacer />

      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path={HOME} exact component={ChoosePizzaSize}/>
          <Route path={CHOOSE_PIZZA_FLAVOURS} component={ChoosePizzaFlavours}/>
        </Switch>
      </Suspense>
    </>
  )
}

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
