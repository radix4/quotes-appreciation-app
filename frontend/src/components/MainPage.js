import React, { useState, useEffect } from 'react'
import Quote from './Quote'
import { Col, Row, Container, Form, Button, Jumbotron } from 'react-bootstrap'
import quotesService from '../services/quotes'
import { Route, Redirect } from 'react-router-dom'

const containerStyle = {
  backgroundColor: '#ebc1b7',
  minHeight: '940px',
}

const leftRightCols = {
  textAlign: 'center',
  display: 'flex',
}

const middleCol = {
  margin: '5% 0% 5% 0%',
}

const MainPage = () => {
  const [quotes, setQuotes] = useState([])
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [logout, setLogout] = useState(false)
  let name = 'Thang Cao '

  useEffect(() => {
    quotesService.getAll().then((initialQuotes) => {
      setQuotes(initialQuotes)
    })
  }, [])

  const handleQuoteChange = (event) => {
    setQuote(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleLogout = async (event) => {
    setLogout(true)
  }

  const saveQuote = (event) => {
    event.preventDefault()

    const newQuote = {
      quote: quote,
      author: author,
    }

    quotesService.create(newQuote).then((returnedQuote) => {
      console.log('create new quote success!')
      setQuotes(quotes.concat(returnedQuote))
    })

    setQuote('')
    setAuthor('')

    // clear react bootstrap form
    document.getElementById('create-quote-form').reset()
  }

  if (logout) {
    return (
      <Route>
        <Redirect to='/' />
      </Route>
    )
  }

  return (
    <Container style={containerStyle} fluid>
      <Row>
        <Col
          style={leftRightCols}
          md={3}
          className='row justify-content-md-center'>
          <h1 className='main-page-side-text'>
            Have <br></br> a quotes <br></br>that you like?
          </h1>
        </Col>

        {/* ===================== MIDDLE COLUMN ================== */}
        <Col style={middleCol} md={6}>
          <Row className='justify-content-md-center'>
            <h1 className='display-2'> Quotes</h1>
          </Row>
          <Row as={Col}>
            <Col style={{ margin: '10%' }}>
              {quotes.map((quote, i) => (
                <Quote key={i} quote={quote} />
              ))}
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
        <Col
          style={leftRightCols}
          md={3}
          className='row justify-content-md-center'>
          <p className='logout-button'>
            {name}
            <Button type='submit' onClick={handleLogout}>
              Logout
            </Button>
          </p>

          <h1 className='main-page-side-text'>
            Don't <br></br> forget to give <br></br> the authors the credits{' '}
            <br></br> they deserve!
          </h1>
        </Col>
      </Row>
    </Container>
  )
}

export default MainPage
