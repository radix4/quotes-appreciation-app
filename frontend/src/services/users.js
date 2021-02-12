/* This module is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = '/api/users'

// token is a private variable
let token = null

// token's value can be changed
const setToken = (newToken) => {
  token = newToken
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }, // token is set to Authorization
  }

  // header is given as 3rd param of axis post method
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { create, setToken }
