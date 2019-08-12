import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { singularOrPlural } from 'utils'
import { HOME } from 'routes'
import styled from 'styled-components'
import pizzaFlavours from 'fake-data/pizza-flavours'
import {
  Divider,
  Grid,
  Card,
  Typography
} from '@material-ui/core'
import {
  CardLink,
  H4,
  HeaderContent,
  PizzasGrid
} from 'ui'

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}))

  if (!location.state) {
    return <Redirect to={HOME } />
  }

  const { flavours, id } = location.state

  const handleChangeCheckbox = (pizzaId) => (e) => {
    setCheckboxes((checkboxes) => {
      return {
        ...checkboxes,
        [pizzaId]: !checkboxes[pizzaId]
      }
    })
  }

  console.log(checkboxes)

  return (
    <>
      <HeaderContent>
        <H4>
          Escolha até {flavours} {' '}
          {singularOrPlural(flavours, 'sabor', 'sabores')}
        </H4>
      </HeaderContent>

      <PizzasGrid>
        {pizzaFlavours.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <Label>
                <input
                  type='checkbox'
                  checked={!!checkboxes[pizza.id]}
                  onChange={handleChangeCheckbox(pizza.id)}
                />
                <Img src={pizza.image} alt={pizza.name}/>

                <Divider />

                <Typography>{pizza.name}</Typography>
                <Typography variant='h5'>{pizza.values[id]}</Typography>
              </Label>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  )
}

const Label = styled(CardLink).attrs({
  component: 'label'
})``

const Img = styled.img`
  width: 200px;
  height: 200px
`

export default ChoosePizzaFlavours
