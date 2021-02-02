const express = require('express')
const app = express()

let users = [
  {
    username: 'thang',
    password: 'shokunin',
  },
  {
    username: 'shiro',
    password: 'crystal',
  },
  {
    username: 'aristotle',
    password: 'iscool',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/users', (request, response) => {
  response.json(users)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
