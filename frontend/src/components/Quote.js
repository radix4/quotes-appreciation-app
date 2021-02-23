import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const Quote = ({ quote }) => {
  return (
    <Jumbotron className='jumbotron'>
      <div className='bg-overlay animated'>
        <p>{quote.content}</p>
        <h3 className='text-right'>{quote.author}</h3>
      </div>
    </Jumbotron>
  )
}

export default Quote
