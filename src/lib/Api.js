import axios from 'axios';
import config from './config.json'
const url = process.env['REACT_APP_APIURL'] || config.APIURL;
console.log("connecting to url", url);
const API = axios.create({
    baseURL: url,
    timeout: 6000,
});
export default API;