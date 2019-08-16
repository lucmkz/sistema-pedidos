import React from 'react'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { useAuth } from 'hooks'
import { singularOrPlural } from 'utils'
import {
  Button as MaterialButton,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

function Footer ({ buttons, location, history }) {
  const { userInfo } = useAuth()

  const { pizzaSize, pizzaFlavours } = location.state
  const { flavours, name, slices } = pizzaSize

  return (
    <FooterContent>
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

            {pizzaFlavours && (
              <Typography>
                {singularOrPlural(pizzaFlavours.length, 'no sabor', 'nos sabores')}{' '}
                <b>{pizzaFlavours.map(({ name }) => name).join(', ')}</b>
              </Typography>
            )}
          </OrderContainer>

          <ButtonsContainer>
            <Button
              {...buttons.back}
              component='a'
              onClick={(e) => {
                e.preventDefault()
                history.goBack()
              }}
            />

            <Button
              {...buttons.action}
              component={Link}
              color='primary'
            />
          </ButtonsContainer>
        </Grid>
      </Container>
    </FooterContent>
  )
}

const FooterContent = styled.footer`
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
  variant: 'contained'
})`
  &&{
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

const ButtonsContainer = styled(Grid).attrs({
  item: true
})`
  && {
    align-items: center;
    display: flex;
  }
`

export default withRouter(Footer)
