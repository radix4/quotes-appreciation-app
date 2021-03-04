import React, { useState, useEffect } from 'react'
import Quotes from './Quotes'
import { Col, Row, Container, Form, Button, Jumbotron } from 'react-bootstrap'
import quotesService from '../services/quotes'
import { Route, Redirect } from 'react-router-dom'
import Notification from './Notification'

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
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      quotesService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    quotesService.getAll().then((initialQuotes) => {
      setQuotes(initialQuotes)
    })
  }, [])

  const onChangeQuote = (event) => setQuote(event.target.value)

  const onChangeAuthor = (event) => setAuthor(event.target.value)

  const onChangeSearch = (event) => setSearch(event.target.value)

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInUser')
    setLogout(true)
  }

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

  const saveQuote = async (event) => {
    event.preventDefault() // avoid form submit to refresh the page

    const newQuote = {
      content: quote,
      author: author,
      vote: 0,
    }

    try {
      await quotesService.create(newQuote).then((returnedQuote) => {
        console.log('create new quote success!')
        setQuotes(quotes.concat(returnedQuote))
      })

      setQuote('')
      setAuthor('')
      document.getElementById('create-quote-form').reset()
    } catch {
      setErrorMessage('Oh snap, you cannot post a blank quote!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
      <Row className='row justify-content-md-center'>
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
                <Notification message={errorMessage} />
                <Form id='create-quote-form' onSubmit={saveQuote}>
                  {/* =============QUOTES INPUT============= */}
                  <Form.Group
                    as={Row}
                    controlId='quotes-text'
                    onChange={onChangeQuote}>
                    <Form.Label column md={2}>
                      Quote
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='e.g. "A problem is a chance for you to do your best."'
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
                        placeholder='e.g. Duke Ellington'
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

          {/* ======= LOGOUT BUTTON ======== */}
          <p className='logout-button'>
            <Button type='submit' onClick={handleLogout}>
              Logout
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default MainPage
