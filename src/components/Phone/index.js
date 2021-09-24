import React from 'react'
import { TextInput, Select } from '../common/styles'
import { mask, unMask } from 'remask'

import { StyledPhone } from './styles'

const Phone = ({ phone, errors, onPhoneChange }) => {
  const validatePhone = (phone) => {
    return (
      (phone?.phoneType !== 'Celular' && phone?.phoneNumber.length === 10) ||
      (phone?.phoneType === 'Celular' && phone?.phoneNumber.length)
    )
  }
  return (
    <StyledPhone>
      <span>Telefone:</span>
      <Select
        value={phone?.phoneType}
        onChange={(e) =>
          onPhoneChange({ ...phone, phoneType: e.currentTarget.value })
        }
      >
        <option value="Residencial">Residencial</option>
        <option value="Comercial">Comercial</option>
        <option value="Celular">Celular</option>
      </Select>
      <TextInput
        $error={errors?.phones && !validatePhone(phone)}
        value={mask(phone?.phoneNumber, ['(99) 9999-9999', '(99) 99999-9999'])}
        maxLength={phone?.phoneType === 'Celular' ? 15 : 14}
        placeholder={
          phone?.phoneType === 'Celular' ? '(99) 99999-9999' : '(99) 9999-9999'
        }
        onChange={(e) => {
          onPhoneChange({
            ...phone,
            phoneNumber: unMask(e.currentTarget.value),
          })
        }}
      />
    </StyledPhone>
  )
}

export default Phone
