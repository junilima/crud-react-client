import styled from 'styled-components'
import {
  Container as GlobalContainer,
  DivCol,
  TextInput,
  Select,
} from '../common/styles'

export const Container = styled(GlobalContainer)`
  ${DivCol} {
    margin: 20px;
  }
  ${TextInput} {
    min-width: 300px;
  }
  ${Select} {
    min-width: 300px;
  }
  .del {
    background-color: darkred;
    color: white;
    margin-right: 20px;
  }
`
