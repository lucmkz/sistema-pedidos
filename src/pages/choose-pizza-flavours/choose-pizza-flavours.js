import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { HOME, CHOOSE_PIZZA_QUANTITY } from 'routes'
import styled from 'styled-components'
import pizzaFlavours from 'fake-data/pizza-flavours'
import {
  singularOrPlural,
  toMoney
} from 'utils'
import {
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
  PizzasGrid,
  Footer
} from 'ui'

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}))

  if (!location.state) {
    return <Redirect to={HOME} />
  }

  const { flavours, id } = location.state.pizzaSize

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

      <Footer buttons={[
        {
          to: HOME,
          children: 'Mudar tamanho'
        },
        {
          to: {
            pathname: CHOOSE_PIZZA_QUANTITY,
            state: {
              ...location.state,
              pizzaFlavours: getFlavoursNameAndId(checkboxes)
            }
          },
          children: 'Quantas pizzas?',
          color: 'primary'
        }
      ]}/>
    </>
  )
}

function checkboxCheckeds (checkbox) {
  return Object.values(checkbox).filter(Boolean)
}

function getFlavoursNameAndId (checkboxes) {
  return Object.entries(checkboxes)
    .filter(([, value]) => !!value)
    .map(([id]) => ({
      id,
      name: pizzaFlavours.find((flavour) => flavour.id === id).name
    }))
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

export default ChoosePizzaFlavours
