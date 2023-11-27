import axios from "axios"
// const BASE_URL = process.env.NEXT_APP_BASEURL
const BASE_URL = 'http://localhost:4500'



export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})

export const axiosPrivateUpload = axios.create({
    baseURL: BASE_URL,
    headers: { "enc-type": "multipart/form-data"},
    withCredentials: true
})