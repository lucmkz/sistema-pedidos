import { Link } from 'react-router-dom'
import { CardActionArea } from '@material-ui/core'
import styled from 'styled-components'

const CardLink = styled(CardActionArea).attrs({
  component: Link
})`
  && {
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing(3, 0)};
  }
`
// min-width: 250px;

export default CardLink
