import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { HOME, CHOOSE_PIZZA_QUANTITY } from 'routes'
import styled from 'styled-components'
import pizzaFlavours from 'fake-data/pizza-flavours'
import { useAuth } from 'hooks'
import {
  singularOrPlural,
  toMoney
} from 'utils'
import {
  Button as MaterialButton,
  Container,
  Divider,
  Grid,
  Card as MaterialCard,
  Typography
} from '@material-ui/core'
import {
  Content,
  CardLink,
  H4,
  HeaderContent,
  PizzasGrid
} from 'ui'

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}))
  const { userInfo } = useAuth()

  if (!location.state) {
    return <Redirect to={HOME} />
  }

  const { flavours, id, name, slices } = location.state

  const handleChangeCheckbox = (pizzaId) => (e) => {
    if (
      checkboxCheckeds(checkboxes).length === flavours && e.target.checked === true) {
      return
    }
    setCheckboxes((checkboxes) => {
      return {
        ...checkboxes,
        [pizzaId]: e.target.checked
      }
    })
  }

  return (
    <>
      <Content>
        <HeaderContent>
          <H4>
            Escolha até {flavours} {' '}
            {singularOrPlural(flavours, 'sabor', 'sabores')}
          </H4>
        </HeaderContent>

        <PizzasGrid>
          {pizzaFlavours.map((pizza) => (
            <Grid item key={pizza.id} xs>
              <Card checked={!!checkboxes[pizza.id]}>
                <Label>
                  <Checkbox
                    checked={!!checkboxes[pizza.id]}
                    onChange={handleChangeCheckbox(pizza.id)}
                  />
                  <Img src={pizza.image} alt={pizza.name} />

                  <Divider />

                  <Typography>{pizza.name}</Typography>
                  <Typography variant='h5'>{toMoney(pizza.values[id])}</Typography>
                </Label>
              </Card>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>

      <Footer>
        <Container>
          <Grid container>
            <OrderContainer>
              <Typography>
                <b>{userInfo.user.firstName}, seu pedido é</b>
              </Typography>
              <Typography>
                Pizza <b>{name.toUpperCase()}</b> {'- '}
                ({slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {' '}
                {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')})
              </Typography>
            </OrderContainer>

            <Grid item>
              <Button to={HOME} >Mudar Tamanho</Button>
              <Button to={CHOOSE_PIZZA_QUANTITY} color='primary'>Quantidade de Pizzas </Button>
            </Grid>
          </Grid>
        </Container>
      </Footer>

    </>
  )
}

function checkboxCheckeds (checkbox) {
  return Object.values(checkbox).filter(Boolean)
}

const Label = styled(CardLink).attrs({
  component: 'label'
})``

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`

const Card = styled(MaterialCard)`
  &&{
    border: 2px solid transparent;
    border-color: ${({ theme, checked }) => checked ? theme.palette.secondary.light : ''}
  }
`

const Img = styled.img`
  width: 200px;
  height: 200px
`

const Footer = styled.footer`
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
  padding: ${({ theme }) => theme.spacing(3)}px;
  width: 100%;
`

const OrderContainer = styled(Grid).attrs({
  item: true
})`
  &&{
    flex-grow: 1;
  }
`

const Button = styled(MaterialButton).attrs({
  variant: 'contained',
  component: Link
})`
  &&{
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default ChoosePizzaFlavours
