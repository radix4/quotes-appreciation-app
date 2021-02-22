import React, { useState } from 'react'
import {
  Col,
  Row,
  Container,
  Image,
  Form,
  Button,
  Table,
  Jumbotron,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const containerStyle = {
  backgroundColor: '#c7f1f2',
  minHeight: '940px',
}

const leftRightCols = {
  //top: '300px',
  textAlign: 'center',
}

const middleCol = {
  backgroundColor: '#ffc9b0',
  margin: '5% 0% 5% 0%',
}

const quotesHeader = {
  font: '50px',
}

const MainPage = () => {
  return (
    <Container style={containerStyle} fluid>
      <Row>
        <Col style={leftRightCols} md={3} className='row align-items-center'>
          <h1 className='col align-self-center'>
            Have <br></br> a quotes <br></br>that you like?
          </h1>
        </Col>

        <Col style={middleCol} md={6}>
          <Row className='justify-content-md-center'>
            <h1 className='display-2'> Quotes</h1>
          </Row>
          <Row as={Col}>
            <Col style={{ margin: '10%' }}>
              <Jumbotron className='jumbotron'>
                <div className='bg-overlay animated'>
                  <p>
                    "This is a simple hero unit, a simple jumbotron-style
                    component for calling extra attention to featured content or
                    information."
                  </p>
                  <h3 className='text-right'>Jiro Ono</h3>
                </div>
              </Jumbotron>
              <Jumbotron>
                <Form>
                  {/* =============USERNAME============= */}

                  <Form.Group as={Row} controlId='exampleForm.ControlTextarea1'>
                    <Form.Label column md={2}>
                      Quotes
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='e.g. "Screw it, let&apos;s do it."'
                      />
                    </Col>
                  </Form.Group>

                  {/* =============PASSWORD============= */}
                  <Form.Group as={Row} controlId='2'>
                    <Form.Label column md={2}>
                      Author
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        type='text'
                        placeholder='e.g. Richard Branson'
                      />
                    </Col>
                  </Form.Group>

                  {/* =============SUBMIT============= */}
                  <Form.Group as={Row}>
                    <Col md={{ span: 3, offset: 10 }}>
                      <Button type='submit'>Save</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Jumbotron>
            </Col>
          </Row>
        </Col>
        <Col style={leftRightCols} md={3} className='row align-items-center'>
          <h1>
            Don't <br></br> forget to give <br></br> the authors the credits{' '}
            <br></br> they deserve!
          </h1>
        </Col>
      </Row>
    </Container>
  )
}

export default MainPage
