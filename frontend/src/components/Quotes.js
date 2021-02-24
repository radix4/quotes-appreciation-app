import React from 'react'
import Quote from './Quote'

const Quotes = ({ quotes, filterByContent }) => {
  let quotesBySearch = quotes.filter(filterByContent)

  return (
    <div>
      {quotesBySearch.map((quote, i) => (
        <Quote key={i} quote={quote} />
      ))}
    </div>
  )
}

export default Quotes
