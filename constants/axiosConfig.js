import axios from 'axios';


const Axios = axios.create({
  baseURL: 'http://localhost:3333'
});

export default Axios;