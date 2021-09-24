import React from 'react'
import AppRouter from './AppRouter'
import AuthContext, { useProvideAuthContext } from './AuthContext'
import GlobalStyles from './styles/GlobalStyles'

const App = () => {
  const auth = useProvideAuthContext()

  return (
    <>
      <AuthContext.Provider value={auth}>
        <AppRouter />
      </AuthContext.Provider>

      <GlobalStyles />
    </>
  )
}

export default App
