import React, { useState, useEffect } from 'react'
import { Jumbotron, Button, Col, Row } from 'react-bootstrap'
import quotesService from '../services/quotes'
import usersService from '../services/users'

const Quote = ({ quote }) => {
  const [votes, setVotes] = useState(0)
  const [username, setUsername] = useState('')

  quotesService.get(quote.id).then((returnedQuote) => {
    setVotes(returnedQuote.vote)
  })

  usersService.get(quote.user).then((returnedUser) => {
    setUsername(returnedUser.username)
  })

  const handleLike = (event) => {
    const updateQuote = {
      vote: votes + 1,
    }

    quotesService.update(quote.id, updateQuote).then((returnedQuote) => {
      console.log('update succeed!')
    })

    setVotes(votes + 1)
  }

  return (
    <Jumbotron className='jumbotron'>
      <div className='bg-overlay animated'>
        <p>{quote.content}</p>
        <h3 className='text-right'>{quote.author}</h3>
      </div>
      <Row>
        <Col>
          <Button onClick={handleLike}>
            <i className='fa fa-thumbs-up thumbs-up-button'> {' ' + votes}</i>
          </Button>
        </Col>
        <Col className='text-right'>
          <i className='quote-user-postdate'>
            Posted by <b>{username}</b> on {quote.date.substring(0, 10)}
          </i>
        </Col>
      </Row>
    </Jumbotron>
  )
}

export default Quote
