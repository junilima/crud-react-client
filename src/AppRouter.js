import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useAuthContext } from './AuthContext'
import CostumersListPage from './components/CostumersListPage'
import LoginPage from './components/LoginPage'
import CostumerPage from './components/CostumerPage'

const ProtectedRoute = ({ children, ...props }) => {
  const { isLoggedIn } = useAuthContext()
  return (
    <Route {...props}>
      {isLoggedIn() ? children : <Redirect to="/login" />}
    </Route>
  )
}

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <ProtectedRoute path="/" exact>
          <CostumersListPage />
        </ProtectedRoute>
        <ProtectedRoute path="/costumers/cpf/:cpf" exact>
          <CostumerPage />
        </ProtectedRoute>
        <ProtectedRoute path="/costumers/new" exact>
          <CostumerPage />
        </ProtectedRoute>
      </Switch>
    </Router>
  )
}

export default AppRouter
