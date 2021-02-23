import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import RegistrationPage from './components/RegistrationPage'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import './styles/App.css'
import './styles/Registration.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/registration'>
          <RegistrationPage />
        </Route>
        <Route path='/main'>
          <MainPage />
        </Route>
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
