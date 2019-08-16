import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Input as MaterialInput } from '@material-ui/core'
import {
  Footer,
  H4,
  HeaderContent,
  Content
} from 'ui'
import { HOME, CHECKOUT } from 'routes'

function ChoosePizzaQuantity ({ location }) {
  const [quantity, setQuantity] = useState(1)

  if (!location.state) {
    return <Redirect to={HOME} />
  }

  function handleChange (e) {
    const { value } = e.target

    if (value >= 1) {
      setQuantity(e.target.value)
    }
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
        </MainContent>
      </Content>

      <Footer
        buttons={{
          back: {
            children: 'Mudar Sabores'
          },

          action: {
            to: CHECKOUT,
            children: 'Finalizar Compra',
            color: 'primary'
          }
        }}
      />

    </>
  )
}

const Input = styled(MaterialInput).attrs({
  type: 'number'
})`
  & input {
    font-size: 80px;
    padding: 10px;
    text-align: center;
    width: 150px
  }
`

const MainContent = styled.div`
  display: flex
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export default ChoosePizzaQuantity
