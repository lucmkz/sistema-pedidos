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
import { AuthContext } from 'contexts/auth'
import pizzaSizes from 'fake-data/piza-size'

const ChoosePizzaSize = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <>
      <Grid container direction='column' alignItems='center'>
        <Title variant='h3'>
          O que vai ser hoje {userInfo.user.firstName}?
        </Title>

        <Title variant='h4'>
          Escolha o tamanho da pizza:
        </Title>
      </Grid>

      <PizzasGrid>
        {pizzaSizes.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <CardActionArea to={{
                pathname: '/choose-pizza-flavours',
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

function singularOrPlural (amount, singular, plural) {
  return amount === 1 ? singular : plural
}

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
