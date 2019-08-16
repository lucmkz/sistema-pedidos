import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
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

          <Button variant='contained' color='secondary'>
            Adicionar e<br />
            montar outra
          </Button>
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

const MainContent = styled.div`
flex-direction: column;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export default ChoosePizzaQuantity
