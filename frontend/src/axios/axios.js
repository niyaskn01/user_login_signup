import axios from 'axios'

const axiosInstance=axios.create({
  baseURL:'https://sample-login-cnii.onrender.com'
  // baseURL:'http://localhost:8080'
})

export default axiosInstance