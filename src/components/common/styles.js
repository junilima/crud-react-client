import styled from 'styled-components'

export const Container = styled.div`
  margin: 100px 20px;
  background-color: var(--color-tertiary);
  padding: 5px 5px 5px 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

export const TextInput = styled.input`
  background: var(--color-quaternary);
  border: 1px solid var(--color-border);
  padding: 13px 18px;
  font-size: 14px;

  margin-top: 20px;
  ${({ $error }) => (!!$error ? 'background-color: lightcoral;' : '')}
`

export const Button = styled.button`
  margin-top: 20px;

  ${({ disabled }) =>
    disabled
      ? 'background-color: grey;'
      : 'background-color: var(--color-primary);'};
  color: var(--color-tertiary);
  padding: 13px 18px;
  font-size: 16px;
  border: none;
  font-weight: bold;
  outline: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.87;
  }
`

export const Select = styled.select`
  background: var(--color-quaternary);
  border: 1px solid var(--color-border);
  padding: 13px 18px;
  font-size: 14px;

  margin-top: 20px;
`

export const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const DivCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const PageHeader = styled(DivRow)`
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`
