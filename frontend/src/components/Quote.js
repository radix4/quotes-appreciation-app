import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const Quote = () => {
  return (
    <Jumbotron className='jumbotron'>
      <div className='bg-overlay animated'>
        <p>
          "This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information."
        </p>
        <h3 className='text-right'>Jiro Ono</h3>
      </div>
    </Jumbotron>
  )
}

export default Quote
