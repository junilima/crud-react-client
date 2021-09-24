import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../AuthContext'

import useApiCostumers from '../../api/useApiCostumers'
import { Button, PageHeader } from '../common/styles'

import { Container } from './styles'

import { mask } from 'remask'

const CostumersListPage = () => {
  const { costumers } = useApiCostumers()
  const history = useHistory()
  const auth = useAuthContext()

  const handleCreate = () => {
    history.push('/costumers/new')
  }

  const handleLogout = () => {
    auth?.signout()
    history.push('/login')
  }

  const handleOpenCostumer = (cpf) => () => {
    history.push(`/costumers/cpf/${cpf}`)
  }

  return (
    <Container>
      <PageHeader>
        <Button onClick={handleCreate}>Adicionar Cliente</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </PageHeader>
      <ul>
        {costumers?.map((costumer) => (
          <li key={costumer?.cpf} onClick={handleOpenCostumer(costumer?.cpf)}>
            <div>
              <span>{costumer?.fullName}</span>{' '}
              {mask(costumer?.cpf, ['999.999.999-99'])}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default CostumersListPage
