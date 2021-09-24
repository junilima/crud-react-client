import styled from 'styled-components'
import { Container as GlobalContainer } from '../common/styles'

export const Container = styled(GlobalContainer)`
  > form {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: stretch;

    padding: 32px;
    min-width: 480px;

    > span {
      margin-top: 20px;
    }

    > input {
      margin-top: 5px;
    }

    > h4 {
      text-align: center;
      margin-top: 10px;
      color: red;
    }
  }
`
