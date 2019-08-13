import { Divider as MaterialDevider } from '@material-ui/core'
import styled from 'styled-components'

const Divider = styled(MaterialDevider)`
  && {
    margin ${({ theme }) => theme.spacing(3)}px;
    width: 100%;
  }
`

export default Divider
