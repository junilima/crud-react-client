import React, { useEffect, useState } from 'react'

import { map, filter, reduce } from 'lodash'

import Email from '../Email'

const index = { count: 0 }
const parseEmailsList = (emailsList) => {
  const filtered = filter(emailsList, (e) => e.email.length > 0)
  const ems = map(filtered, (e) => `${e.email},${e.id}`)?.join(';')
  return ems
}

const Emails = ({ costumer, errors, setEmails }) => {
  const [emailsList, setEmailsList] = useState({
    [index.count]: {
      id: index.count,
      email: '',
    },
  })

  useEffect(() => {
    if (!!costumer?.emails) {
      const ems = costumer?.emails?.split(';')
      index.count = index.count + ems.length

      const newEmails = reduce(
        ems,
        (result, value, key) => {
          const [em, i] = value?.split(',')
          result[i || index.count] = {
            id: i || index.count,
            email: em,
          }
          index.count = index.count + 1
          return result
        },
        {}
      )

      newEmails[index.count] = {
        id: index.count,
        email: '',
      }

      index.count = index.count + 1

      setEmailsList(newEmails)
    }
  }, [costumer?.emails])

  const onEmailChange = (email) => {
    const newEmails = {
      ...emailsList,
      [email?.id]: { ...emailsList[email?.id], ...email },
    }

    const needToAdd =
      filter(
        newEmails,
        (e) =>
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            e.email
          )
      ).length === 0

    if (needToAdd) {
      index.count = index.count + 1
      newEmails[index.count] = {
        id: index.count,
        email: '',
      }
    }

    setEmailsList(newEmails)
    setEmails(parseEmailsList(newEmails))
  }

  return (
    <>
      {map(emailsList, (email) => (
        <Email
          errors={errors}
          key={email?.id}
          email={email}
          onEmailChange={onEmailChange}
        />
      ))}
    </>
  )
}

export default Emails
