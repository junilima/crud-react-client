import React, { useCallback, useState } from 'react'

import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../AuthContext'

import { Container } from './styles'

import { TextInput, Button } from '../common/styles'

const LoginInterface = (onLogin) => {
  const [user, setUser] = useState('')
  const [password, setPasswoord] = useState('')
  const [error, setError] = useState()
  const history = useHistory()

  const { signin, isLoading } = useAuthContext()

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault()
      if (!isLoading) {
        setError('')
        signin(user, password)
          .then((response) => {
            history.push('/')
          })
          .catch((e) => {
            setError(e?.message)
          })
      }
    },
    [history, isLoading, password, signin, user]
  )

  return (
    <Container>
      <form onSubmit={handleLogin}>
        <span>Usuário:</span>
        <TextInput
          value={user}
          onChange={(e) => setUser(e.currentTarget.value)}
        />
        <span>Senha:</span>
        <TextInput
          value={password}
          onChange={(e) => setPasswoord(e.currentTarget.value)}
        />
        {error && <h4>{error}</h4>}
        <Button>{isLoading ? '...' : 'Entrar'}</Button>
      </form>
    </Container>
  )
}

export default LoginInterface
