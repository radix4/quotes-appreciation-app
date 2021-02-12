import React, { useState } from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import background from '../images/registration.png'
import userService from '../services/users'

const RegistrationPage = ({ createUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const addUser = (event) => {
    event.preventDefault()

    const user = {
      username: username,
      password: password,
    }

    userService.create(user).then((returnedUser) => {
      console.log('create user success!')
    })

    setUsername('')
    setPassword('')

    // clear react bootstrap form
    document.getElementById('create-user-form').reset()
  }

  const printStates = () => {
    console.log('username: ', username)
    console.log('password: ', password)
  }

  return (
    <Container style={container} fluid>
      <Row>
        <Col className='left-col'>
          <Image className='background-img' src={background}></Image>
        </Col>

        <Col>
          <Row style={rightRow}>
            <h2>Registration</h2>
            <Form id='create-user-form' onSubmit={addUser}>
              {/* =============USERNAME============= */}
              <Form.Group
                as={Row}
                controlId='userName'
                onChange={handleUsernameChange}>
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
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default RegistrationPage
