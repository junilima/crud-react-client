import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *, button, input {
    font-family: Roboto, sans-serif;
  }
  body {
    background-color: lightcyan;
  }
  :root {
    --color-primary: #0d2f81;
    --color-secondary: #add8e6;
    --color-tertiary: #fff;
    --color-quaternary: #ddd
  }
`
