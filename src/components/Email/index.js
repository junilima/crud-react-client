import React from 'react'

import { TextInput } from '../common/styles'
import { StyledEmail } from './styles'

const Email = ({ email, errors, onEmailChange }) => {
  const validateEmail = (email) =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )

  return (
    <StyledEmail>
      <span>Email:</span>
      <TextInput
        $error={errors?.emails && !validateEmail(email?.email)}
        value={email?.email}
        onChange={(e) => {
          onEmailChange({
            ...email,
            email: e.currentTarget.value,
          })
        }}
      />
    </StyledEmail>
  )
}

export default Email
