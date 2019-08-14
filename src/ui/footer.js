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

function Footer ({ buttons, location }) {
  const { userInfo } = useAuth()

  const { name, slices, flavours } = location.state

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
          </OrderContainer>

          <Grid item>
            {buttons.map((button) => (
              <Button key={button.to} {...button} />
            ))}

          </Grid>
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
  variant: 'contained',
  component: Link
})`
  &&{
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default withRouter(Footer)
