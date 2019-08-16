import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import {
  Footer,
  H4,
  HeaderContent,
  Content
} from 'ui'
import {
  Button,
  Input as MaterialInput
} from '@material-ui/core'
import { HOME, CHECKOUT } from 'routes'
import { useOrder } from 'hooks'

function ChoosePizzaQuantity ({ location }) {
  const [quantity, setQuantity] = useState(1)
  const { addPizzaToOrder } = useOrder()

  if (!location.state) {
    return <Redirect to={HOME} />
  }

  function handleChange (e) {
    const { value } = e.target

    if (value >= 1) {
      setQuantity(e.target.value)
    }
  }

  function addPizza () {
    addPizzaToOrder({
      size: location.state.pizzaSize.id,
      flavours: location.state.pizzaFlavours.map(f => f.id),
      quantity
    })
  }

  return (
    <>
      <Content>
        <HeaderContent>
          <H4>
            Quantas pizzas você gostaria <br />
            de pedir, com esses sabores
          </H4>
        </HeaderContent>

        <MainContent>
          <Input value={quantity} onChange={handleChange} autoFocus />

          <ButtonAddPizza to={HOME} onClick={addPizza}>
            Adicionar e<br />
            montar outra
          </ButtonAddPizza>
        </MainContent>
      </Content>

      <Footer
        buttons={{
          back: {
            children: 'Mudar Sabores'
          },

          action: {
            to: CHECKOUT,
            onClick: addPizza,
            children: 'Finalizar Compra',
            color: 'primary'
          }
        }}
      />

    </>
  )
}

const MainContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

const Input = styled(MaterialInput).attrs({
  type: 'number'
})`
&& {
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
}

  & input {
    font-size: 80px;
    padding: 10px;
    text-align: center;
    width: 150px
  }
`

const ButtonAddPizza = styled(Button).attrs({
  color: 'secondary',
  component: Link,
  variant: 'contained'
})`
  && {
    text-align: center;
  }
`

export default ChoosePizzaQuantity
