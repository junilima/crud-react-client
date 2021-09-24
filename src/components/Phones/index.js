import React, { useState, useEffect } from 'react'
import Phone from '../Phone'
import { map, filter, reduce } from 'lodash'

const index = { count: 0 }
const parsePhonesList = (phonesList) => {
  const filtered = filter(phonesList, (p) => p?.phoneNumber?.length > 0)
  const phs = map(
    filtered,
    (p) => `${p.phoneType},${p.phoneNumber},${p.id}`
  )?.join(';')
  return phs
}

const Phones = ({ costumer, errors, setPhones }) => {
  const [phonesList, setPhonesList] = useState({
    [index.count]: {
      id: index.count,
      phoneNumber: '',
      phoneType: 'Residencial',
    },
  })

  useEffect(() => {
    if (!!costumer?.phones) {
      const phs = costumer?.phones?.split(';')

      index.count = index.count + phs.length

      const newPhones = reduce(
        phs,
        (result, value, key) => {
          const [t, n, i] = value?.split(',')
          result[i || index.count] = {
            id: i || index.count,
            phoneNumber: n,
            phoneType: t,
          }
          index.count = index.count + 1
          return result
        },
        {}
      )

      newPhones[index.count] = {
        id: index.count,
        phoneNumber: '',
        phoneType: 'Residencial',
      }
      index.count = index.count + 1

      setPhonesList(newPhones)
    }
  }, [costumer?.phones])

  const onPhoneChange = (phone) => {
    const newPhones = {
      ...phonesList,
      [phone?.id]: { ...phonesList[phone?.id], ...phone },
    }

    const needToAdd =
      filter(
        newPhones,
        (p) => p?.phoneNumber?.length < (p?.phoneType === 'Celular' ? 11 : 10)
      )?.length === 0

    if (needToAdd) {
      index.count = index.count + 1
      newPhones[index.count] = {
        id: index.count,
        phoneNumber: '',
        phoneType: 'Residencial',
      }
    }

    setPhonesList(newPhones)
    setPhones(parsePhonesList(newPhones))
  }

  return (
    <>
      {map(phonesList, (phone) => (
        <Phone
          errors={errors}
          key={phone?.id}
          phone={phone}
          onPhoneChange={onPhoneChange}
        />
      ))}
    </>
  )
}

export default Phones
