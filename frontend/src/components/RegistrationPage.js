import React, { useState } from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import background from '../images/registration.png'
import userService from '../services/users'
import Notification from './Notification'

const RegistrationPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const rightRow = {
    padding: '30%',
  }

  const container = {
    backgroundColor: '#F0F8FF',
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addUser = async (event) => {
    event.preventDefault()

    const user = {
      username: username,
      password: password,
    }

    try {
      await userService.create(user).then((returnedUser) => {
        console.log('create user success!')
      })

      setErrorMessage('Yay, account successfully created!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setUsername('')
      setPassword('')

      // clear react bootstrap form
      document.getElementById('create-user-form').reset()
    } catch (exception) {
      setErrorMessage('Oh no, do not leave it blank!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Container style={container} fluid>
      <Row className='align-items-center d-flex flex-wrap-reverse'>
        {/* =================LEFT COLUMN================ */}
        <Col className='left-col' md={6}>
          <Image className='background-img' src={background}></Image>
        </Col>

        {/* =================RIGHT COLUMN================ */}
        <Col>
          <Row style={rightRow} md={6}>
            <Notification message={errorMessage} />
            <h2>Registration</h2>
            <Form id='create-user-form' onSubmit={addUser}>
              {/* =============USERNAME============= */}
              <Form.Group
                as={Row}
                controlId='userName'
                onChange={handleUsernameChange}>
                <Form.Label column md={4}>
                  Name
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='text' placeholder='Username' />
                </Col>
              </Form.Group>
              {/* =============PASSWORD============= */}
              <Form.Group
                as={Row}
                controlId='password'
                onChange={handlePasswordChange}>
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
                  <Button type='submit'>Register</Button>
                </Col>
              </Form.Group>
              <>Have an account? </>
              <Link to='/'> Back to Login</Link>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default RegistrationPage
