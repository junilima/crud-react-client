import React from 'react'
import axios from 'axios'
import { mask, unMask } from 'remask'
import { TextInput, Select, DivRow, DivCol } from '../common/styles'

const Address = ({
  costumer,
  errors,
  setCep,
  setStreetName,
  setComplement,
  setNeighborhood,
  setCity,
  setState,
  setAddress,
}) => {
  const validateCep = (element) => {
    const originalCep = unMask(element.currentTarget.value)
    setCep(originalCep)

    if (originalCep.length === 8) {
      axios
        .get(`http://viacep.com.br/ws/${originalCep}/json/`)
        .then((response) => {
          console.log(response)
          setAddress({
            cep: response?.data?.cep,
            streetName: response?.data?.logradouro,
            complement: response?.data?.complemento,
            neighborhood: response?.data?.bairro,
            city: response?.data?.localidade,
            state: response?.data?.uf,
          })
        })
    }
  }

  return (
    <>
      <DivRow>
        <DivCol>
          <span>CEP*:</span>
          <TextInput
            $error={errors?.cep}
            value={mask(costumer?.cep, ['99999-999'])}
            placeholder="00000-000"
            onChange={(e) => validateCep(e)}
          />
        </DivCol>
        <DivCol>
          <span>Logradouro*:</span>
          <TextInput
            $error={errors?.streetName}
            value={costumer?.streetName}
            onChange={(e) => setStreetName(e.currentTarget.value)}
          />
        </DivCol>
      </DivRow>
      <DivRow>
        <DivCol>
          <span>Complemento:</span>
          <TextInput
            $error={errors?.complement}
            value={costumer?.complement}
            onChange={(e) => setComplement(e.currentTarget.value)}
          />
        </DivCol>
        <DivCol>
          <span>Bairro*:</span>
          <TextInput
            $error={errors?.neighborhood}
            value={costumer?.neighborhood}
            onChange={(e) => setNeighborhood(e.currentTarget.value)}
          />
        </DivCol>
      </DivRow>
      <DivRow>
        <DivCol>
          <span>Cidade*:</span>
          <TextInput
            $error={errors?.city}
            value={costumer?.city}
            onChange={(e) => setCity(e.currentTarget.value)}
          />
        </DivCol>
        <DivCol>
          <span>Estado*:</span>
          <Select
            $error={errors?.state}
            value={costumer?.state}
            onChange={(e) => setState(e.currentTarget.value)}
          >
            <option value="AL">AL</option>
            <option value="AC">AC</option>
            <option value="AM">AM</option>
            <option value="AP">AP</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>
          </Select>
        </DivCol>
      </DivRow>
    </>
  )
}

export default Address
