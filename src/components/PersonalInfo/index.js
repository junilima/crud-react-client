import React from 'react'

import { mask, unMask } from 'remask'
import { DivCol, DivRow, TextInput } from '../common/styles'

const PersonalInfo = ({ costumer, errors, setFullName, setCpf, isNew }) => {
  return (
    <DivRow>
      <DivCol>
        <span>Nome Completo*:</span>
        <TextInput
          $error={errors?.fullName}
          value={costumer?.fullName}
          minLength="3"
          maxLength="100"
          onChange={(e) => setFullName(e.currentTarget.value)}
        />
      </DivCol>
      <DivCol>
        <span>CPF*:</span>
        <TextInput
          disabled={!isNew}
          $error={errors?.cpf}
          value={costumer?.cpf}
          placeholder="999.999.999-99"
          onChange={(e) =>
            setCpf(mask(unMask(e.currentTarget.value), ['999.999.999-99']))
          }
        />
      </DivCol>
    </DivRow>
  )
}

export default PersonalInfo
