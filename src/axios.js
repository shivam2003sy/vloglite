import axios from 'axios'
axios.defaults.baseURL = 'https://bloglite-21f1006233.b4a.run/'
// axios.defaults.baseURL = 'https://bloglite-21f1006233.b4a.run/'
axios.defaults.headers.common['Authorization']  = `Bearer ${localStorage.getItem('tocken')}`