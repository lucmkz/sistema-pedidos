import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Divider as MaterialDevider,
  Typography,
  withStyles,
  Paper
} from '@material-ui/core'
import { AuthContext } from '../../contexts/auth'
import Header from './header'

const Main = () => {
  const { userInfo } = useContext(AuthContext)
  const userName = userInfo.user.displayName.split(' ')[0]

  return (
    <>
    <Header />
      <Spacer />

      <Content>
        <Grid container direction='column' alignItems='center'>
          <Title variant='h3'>
            O que vai ser hoje {userName}?
          </Title>

          <Title variant='h4'>
            Escolha o tamanho da pizza:
          </Title>
        </Grid>

        <PizzasGrid>
          {pizzaSizes.map((pizza) => (
            <Grid item key={pizza.id} xs>
              <PaperPizza>
                <Pizza>
                  <PizzaText>{pizza.size}cm</PizzaText>
                </Pizza>

                <Divider />

                <Typography variant='h5'>{pizza.name}</Typography>
                <Typography>
                  {pizza.slices} fatias, {' '}
                  {pizza.flavours}
                  {singularOrPlural(pizza.flavours, ' sabor', ' sabores')}
                </Typography>
              </PaperPizza>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>
    </>
  )
}

function singularOrPlural (amount, singular, plural) {
  return amount === 1 ? singular : plural
}

const pizzaSizes = [
  {
    id: 0,
    name: 'Pequena',
    size: 28,
    slices: 2,
    flavours: 1
  },
  {
    id: 1,
    name: 'Média',
    size: 30,
    slices: 6,
    flavours: 2
  },
  {
    id: 2,
    name: 'Média',
    size: 32,
    slices: 8,
    flavours: 2
  }
]

const Divider = styled(MaterialDevider)`
  margin: 20px 0;
  width: 100%;
`

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: 'center'
})``

const PizzasGrid = styled(Grid).attrs({
  container: true,
  spacing: 4
})`
  padding: 20px;
`

const PaperPizza = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding 20px 0;
  min- width 250px;
`

const Pizza = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;

  &::before,
  &::after {
    content: '';
    background: #ccc;
    position: absolute;
    transform: rotate(45deg);
  }

  &::before {
    height:1px;
    width: 160px;
  }

  &::after {
    height:160px;
    width: 1px;
  }
`

const PizzaText = styled(Typography).attrs({
  variant: 'h5'
})`
  border-radius: 50%;
  height: 80px;
  width: 80px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`

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
