import React, { useContext } from 'react'
import styled from 'styled-components'
import pizzaSizes from 'fake-data/piza-size'
import { singularOrPlural } from 'utils'
import { AuthContext } from 'contexts/auth'
import { CHOOSE_PIZZA_FLAVOURS } from 'routes'
import {
  CardLink,
  Divider,
  H3,
  H4,
  PizzasGrid,
  Content
} from 'ui'
import {
  Grid,
  Typography,
  Card
} from '@material-ui/core'

const ChoosePizzaSize = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Content>
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
              <CardLink to={{
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
              </CardLink>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </Content>
  )
}

const Pizza = styled.div`
  height: 200px;
  width: 200px;
  background: ${({ theme }) => theme.palette.common.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.grey.A100};
  border-radius: 50%;
  position: relative;
  z-index: 1;

  &::before,
  &::after {
    content: '';
    background: ${({ theme }) => theme.palette.grey.A100};
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
  &&{
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: ${({ theme }) => theme.palette.common.white};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }
`

export default ChoosePizzaSize
