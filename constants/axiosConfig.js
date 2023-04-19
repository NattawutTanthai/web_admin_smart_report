import axios from 'axios';


const Axios = axios.create({
  // baseURL: 'http://localhost:3333'
  baseURL: 'https://api-smart-report.vercel.app'  
});

export default Axios;
