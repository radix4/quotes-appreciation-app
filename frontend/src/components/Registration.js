import React from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import background from '../images/registration.png'

const Registration = () => {
  const rightRow = {
    padding: '30%',
  }

  return (
    <Container fluid>
      <Row>
        <Col className='left-col'>
          <Image className='background-img' src={background}></Image>
        </Col>

        <Col>
          <Row style={rightRow}>
            <h2>Registration</h2>
            <Form>
              <Form.Group as={Row} controlId='formHorizontalEmail'>
                <Form.Label column sm={4}>
                  First Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type='text' placeholder='' />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='formHorizontalEmail'>
                <Form.Label column sm={4}>
                  Last Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type='text' placeholder='' />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='formHorizontalEmail'>
                <Form.Label column sm={4}>
                  Email
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type='email' placeholder='Email' />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='formHorizontalEmail'>
                <Form.Label column sm={4}>
                  Password
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type='password' placeholder='Password' />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='formHorizontalPassword'>
                <Form.Label column sm={4}>
                  Confirm
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 4 }}>
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
