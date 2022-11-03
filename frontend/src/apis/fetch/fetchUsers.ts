import fetchApi from "../fetchApi"
import { useQuery, useMutation } from "react-query"
import { AxiosError } from "axios"

interface createUser {
    username: string,
    email: string,
    password: string
}

interface loginUser {
    email: string,
    password: string
}

async function createUser(user: createUser) {

    try{
        var response = await fetchApi.post("/user",{
                username: user.username,
                email: user.email,
                password: user.password
            })
    }catch(error){
        const err = error as AxiosError
        return err.response?.data
    }

    return response.data
}

async function loginUser(user: loginUser) {

    try{
        var response = await fetchApi.post("/auth/login",{
                email: user.email,
                password: user.password
            })
    }catch(error){
        const err = error as AxiosError
        return err.response?.data
    }

    return response.data
}



export { createUser, loginUser }

