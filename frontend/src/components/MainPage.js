import React, { useState, useEffect } from 'react'
import Quotes from './Quotes'
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
  const [search, setSearch] = useState('')

  useEffect(() => {
    quotesService.getAll().then((initialQuotes) => {
      setQuotes(initialQuotes)
    })
  }, [])

  const onChangeQuote = (event) => setQuote(event.target.value)

  const onChangeAuthor = (event) => setAuthor(event.target.value)

  const onChangeSearch = (event) => setSearch(event.target.value)

  const handleLogout = (event) => setLogout(true)

  const handleMostVotes = async (event) => {
    let copy
    await quotesService.getAll().then((initialQuotes) => {
      copy = initialQuotes
    })

    copy.sort((a, b) => b.vote - a.vote)
    setQuotes(copy)
  }

  const handleLongest = async (event) => {
    let copy
    await quotesService.getAll().then((initialQuotes) => {
      copy = initialQuotes
    })

    copy.sort((a, b) => b.content.length - a.content.length)
    setQuotes(copy)
  }

  const handleShortest = async (event) => {
    let copy
    await quotesService.getAll().then((initialQuotes) => {
      copy = initialQuotes
    })

    copy.sort((a, b) => a.content.length - b.content.length)
    setQuotes(copy)
  }

  const handleMostRecent = async (event) => {
    let copy
    await quotesService.getAll().then((initialQuotes) => {
      copy = initialQuotes
    })

    copy.sort((a, b) => new Date(b.date) - new Date(a.date))
    setQuotes(copy)
  }

  const saveQuote = (event) => {
    event.preventDefault() // avoid form submit to refresh the page

    const newQuote = {
      content: quote,
      author: author,
      vote: 0,
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

  const filterByContent = (quote) => {
    return quote.content.toLowerCase().indexOf(search) !== -1
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
              {/* ====================== SEARCH BAR ===================== */}
              <Form.Group controlId='search-bar' onChange={onChangeSearch}>
                <Form.Control type='text' placeholder='Search for a quote..' />
              </Form.Group>

              {/* ====================== FILTER BUTTONS ================== */}
              <div>
                <Button variant='primary' onClick={handleMostVotes}>
                  Most Votes
                </Button>{' '}
                <Button variant='secondary' onClick={handleMostRecent}>
                  Most Recent
                </Button>{' '}
                <Button variant='success' onClick={handleLongest}>
                  Longest
                </Button>{' '}
                <Button variant='warning' onClick={handleShortest}>
                  Shortest
                </Button>
              </div>

              <div>
                <br></br>
              </div>

              {/* ====================== QUOTES DISPLAY ================== */}
              <Quotes quotes={quotes} filterByContent={filterByContent} />
              <Jumbotron>
                <Form id='create-quote-form' onSubmit={saveQuote}>
                  {/* =============QUOTES INPUT============= */}
                  <Form.Group
                    as={Row}
                    controlId='quotes-text'
                    onChange={onChangeQuote}>
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

                  {/* =============AUTHOR INPUT============= */}
                  <Form.Group
                    as={Row}
                    controlId='author-text'
                    onChange={onChangeAuthor}>
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
