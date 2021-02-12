import React, { useState } from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import background from '../images/login.png'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const leftCol = {
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

  return (
    <Container style={container} fluid>
      <Row className='align-items-center'>
        <Col md={4}>
          <Row style={leftCol}>
            <h2>Login</h2>
            <Form>
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
                  <Button type='submit'>Login</Button>
                </Col>
              </Form.Group>
            </Form>
            Don't have an account?
            <a href='#'>Create an account</a>
          </Row>
        </Col>
        <Col md={8} className='left-col'>
          <Image className='background-img' src={background}></Image>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
