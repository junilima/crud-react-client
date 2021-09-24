import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useApiCostumerByCpf } from '../../api/useApiCostumers'
import { Container } from './styles'
import Address from '../Address'
import Phones from '../Phones'
import Emails from '../Emails'
import PersonalInfo from '../PersonalInfo'
import { Button, DivCol, DivRow, PageHeader } from '../common/styles'
import axiosApi from '../../api/axiosApi'
import { filter } from 'lodash'

const checkFields = {
  fullName: (value) => {
    const chars = value.replace(/[^a-z0-9\s]/gi, '') === value
    const size = value.length >= 3 && value.length <= 100
    return chars && size
  },
  cpf: (value) => {
    return value.length === 14
  },
  cep: (value) => {
    return value.length === 9
  },
  streetName: (value) => {
    return value.length !== 0
  },
  complement: (value) => {
    return true
  },
  neighborhood: (value) => {
    return value.length !== 0
  },
  city: (value) => {
    return value.length !== 0
  },
  state: (value) => {
    return value.length !== 0
  },
  phones: (value) => {
    const phones = value.split(';')

    const validPhones =
      phones.length === 0
        ? []
        : filter(phones, (phone) => {
            if (phone === '') return
            const [phoneType, phoneNumber] = phone?.split(',')

            return (
              (phoneType === 'Celular' && phoneNumber.length === 11) ||
              (phoneType !== 'Celular' && phoneNumber.length === 10)
            )
          })

    return validPhones.length === phones.length && phones.length !== 0
  },
  emails: (value) => {
    const emails = value.split(';')

    const validEmails = filter(emails, (email) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.split(',')[0]
      )
    )
    return validEmails.length === emails.length && validEmails.length !== 0
  },
}

const CostumerPage = () => {
  const [costumer, setCostumer] = useState({
    fullName: '',
    cpf: '',
    cep: '',
    streetName: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    phones: '',
    emails: '',
  })

  const [isSaving, setIsSaving] = useState()
  const [errors, setErrors] = useState()

  const history = useHistory()
  const location = useLocation()
  const isNew = location.pathname === '/costumers/new'

  const { cpf } = useParams()
  const { costumer: loadedCostumer, isLoading } = useApiCostumerByCpf(cpf)

  useEffect(() => {
    if (loadedCostumer) setCostumer(loadedCostumer)
  }, [loadedCostumer])

  const handleBack = () => {
    history.push('/')
  }

  const handleSave = () => {
    let errs = {}

    Object.keys(checkFields)?.forEach((f) => {
      const valid = checkFields[f](costumer[f])
      if (!valid) {
        errs[f] = true
      }
    })
    setErrors(errs)

    if (Object.keys(errs).length) {
      return
    }

    if (isNew) {
      setIsSaving(true)
      axiosApi.post('/costumers', costumer).then(() => {
        history.push('/')
      })
    } else {
      setIsSaving(true)
      axiosApi.put(`/costumers/${cpf}`, costumer).then(() => {
        history.push('/')
      })
    }
  }

  const handleDelete = () => {
    setIsSaving(true)
    axiosApi.delete(`/costumers/${cpf}`, costumer).then(() => {
      history.push('/')
    })
  }

  const editCostumer = (field) => (value) => {
    setCostumer({ ...costumer, [field]: value })
  }

  const setAddress = (addr) => {
    setCostumer({ ...costumer, ...addr })
  }

  return (
    <Container>
      {!isNew && isLoading ? (
        <PageHeader>Loading...</PageHeader>
      ) : (
        <PageHeader>
          <Button disabled={isSaving} onClick={handleBack}>
            Voltar
          </Button>
          <DivRow>
            {!isNew && (
              <Button
                className="del"
                disabled={isSaving}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <Button disabled={isSaving} onClick={handleSave}>
              {isNew ? 'Adicionar' : 'Save'}
            </Button>
          </DivRow>
        </PageHeader>
      )}
      <PersonalInfo
        costumer={costumer}
        errors={errors}
        setFullName={editCostumer('fullName')}
        setCpf={editCostumer('cpf')}
        isNew={isNew}
      />
      <Address
        costumer={costumer}
        errors={errors}
        setCep={editCostumer('cep')}
        setStreetName={editCostumer('streetName')}
        setComplement={editCostumer('complement')}
        setNeighborhood={editCostumer('neighborhood')}
        setCity={editCostumer('city')}
        setState={editCostumer('state')}
        setAddress={setAddress}
      />
      <DivRow>
        <DivCol>
          <Phones
            errors={errors}
            costumer={costumer}
            setPhones={editCostumer('phones')}
          />
        </DivCol>
        <DivCol>
          <Emails
            errors={errors}
            costumer={costumer}
            setEmails={editCostumer('emails')}
          />
        </DivCol>
      </DivRow>
    </Container>
  )
}

export default CostumerPage
