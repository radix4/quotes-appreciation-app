import React, { useState } from 'react'
import Quote from './Quote'
import { Col, Row, Container, Form, Button, Jumbotron } from 'react-bootstrap'
import quotesService from '../services/quotes'

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
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  const handleQuoteChange = (event) => {
    setQuote(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const saveQuote = (event) => {
    event.preventDefault()

    const newQuote = {
      quote: quote,
      author: author,
    }

    quotesService.create(newQuote).then((returnedQuote) => {
      console.log('create new quote success!')
    })

    setQuote('')
    setAuthor('')

    // clear react bootstrap form
    document.getElementById('create-quote-form').reset()
  }

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
              <Quote />
              <Jumbotron>
                <Form id='create-quote-form' onSubmit={saveQuote}>
                  {/* =============QUOTES INPUT============= */}

                  <Form.Group
                    as={Row}
                    controlId='quotes-text'
                    onChange={handleQuoteChange}>
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

                  {/* =============AUTHOR PUT============= */}
                  <Form.Group
                    as={Row}
                    controlId='2'
                    onChange={handleAuthorChange}>
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

                  {/* =============SAVE BUTTON============= */}
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
