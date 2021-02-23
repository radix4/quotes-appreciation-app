import axios from 'axios'
const baseUrl = '/api/quotes'

// token is a private variable
let token = null

// token's value can be changed
const setToken = (newToken) => {
  console.log('new token: ', newToken)
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

// create quotes
const create = async (newObject) => {
  console.log('new Object: ', newObject)
  const config = {
    headers: { Authorization: token }, // token is set to Authorization
  }

  // header is given as 3rd param of axis post method
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { setToken, getAll, create }
