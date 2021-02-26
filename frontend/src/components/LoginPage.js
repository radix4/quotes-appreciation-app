import React, { useState } from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import { Route, Link, Redirect } from 'react-router-dom'
import background from '../images/login.png'
import loginService from '../services/login'
import quotesService from '../services/quotes'
import Notification from './Notification'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const leftCol = {
    padding: '30%',
  }

  const container = {
    backgroundColor: '#F0F8FF',
  }

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      quotesService.setToken(user.token)
      document.getElementById('login-form').reset()

      console.log('logged in')
      setLoggedIn(true)
    } catch (exception) {
      console.log('login fail, wrong credentials')
      setErrorMessage('Oh no, wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setLoggedIn(false)
    }
  }

  if (loggedIn) {
    return (
      <Route exact path='/'>
        <Redirect to='/main' />
      </Route>
    )
  }
  return (
    <Container style={container} fluid>
      <Row className='align-items-center'>
        <Col md={4}>
          <Row style={leftCol}>
            <Notification message={errorMessage} />
            <h2>Login</h2>
            <Form id='login-form' onSubmit={handleLogin}>
              {/* =============USERNAME============= */}
              <Form.Group
                as={Row}
                controlId='userName'
                onChange={onChangeUsername}>
                <Form.Label column md={4}>
                  Username
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='text' placeholder='Username' />
                </Col>
              </Form.Group>

              {/* =============PASSWORD============= */}
              <Form.Group
                as={Row}
                controlId='password'
                onChange={onChangePassword}>
                <Form.Label column md={4}>
                  Password
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='password' placeholder='Password' />
                </Col>
              </Form.Group>

              {/* =============SUBMIT============= */}
              <Form.Group as={Row}>
                <Col md={{ span: 10, offset: 4 }}>
                  <Button type='submit'>Login</Button>
                </Col>
              </Form.Group>
            </Form>
            {/* ===============LINK================ */}
            Don't have an account?
            <Link to='/registration'>Create an account</Link>
          </Row>
        </Col>
        {/* =================LEFT COLUMN================ */}
        <Col md={8} className='left-col'>
          <Image className='background-img' src={background}></Image>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
