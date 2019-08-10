import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Grid,
  Divider as MaterialDevider,
  Typography,
  Card,
  CardActionArea as MaterialCardActionArea
} from '@material-ui/core'
import { singularOrPlural } from 'utils'
import { H3, H4 } from 'ui'
import { AuthContext } from 'contexts/auth'
import pizzaSizes from 'fake-data/piza-size'
import { CHOOSE_PIZZA_FLAVOURS } from 'routes'

const ChoosePizzaSize = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <>
      <Grid container direction='column' alignItems='center'>
        <H3>
          O que vai ser hoje {userInfo.user.firstName}?
        </H3>

        <H4>
          Escolha o tamanho da pizza:
        </H4>
      </Grid>

      <PizzasGrid>
        {pizzaSizes.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <CardActionArea to={{
                pathname: CHOOSE_PIZZA_FLAVOURS,
                state: pizza
              }}>
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
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  )
}

const Divider = styled(MaterialDevider)`
  margin: 20px 0;
  width: 100%;
`

const PizzasGrid = styled(Grid).attrs({
  container: true,
  spacing: 4
})`
  padding: 20px;
`

const CardActionArea = styled(MaterialCardActionArea).attrs({
  component: Link
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding 20px 0;
  min- width 250px;
`

const Pizza = styled.div`
  height: 200px;
  width: 200px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
  z-index: 1;

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

export default ChoosePizzaSize
