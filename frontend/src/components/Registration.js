import React from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import background from '../images/registration.png'

const users = [
  {
    username: 'thang',
    password: 'shokunin',
  },
  {
    username: 'shiro',
    password: 'crystal',
  },
  {
    username: 'aristotle',
    password: 'iscool',
  },
]

const Registration = () => {
  const rightRow = {
    padding: '30%',
  }

  const container = {
    backgroundColor: '#F0F8FF',
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
            <Form>
              <Form.Group as={Row} controlId='userName'>
                <Form.Label column md={4}>
                  Username
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='text' placeholder='Username' />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='password'>
                <Form.Label column md={4}>
                  Password
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='password' placeholder='Password' />
                </Col>
              </Form.Group>

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

export default Registration
