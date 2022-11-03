import axios from "axios"

const BASE_URL = process.env.BACKEND_URL

const fetchApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})




export default fetchApi
