import React, { useState, useEffect } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import quotesService from '../services/quotes'

const Quote = ({ quote }) => {
  const [votes, setVotes] = useState(0)

  quotesService.get(quote.id).then((returnedQuote) => {
    setVotes(returnedQuote.vote)
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
      <Button onClick={handleLike}>
        <i className='fa fa-thumbs-up thumbs-up-button'> {' ' + votes}</i>
      </Button>
    </Jumbotron>
  )
}

export default Quote
