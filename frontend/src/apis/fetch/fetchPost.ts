import fetchApi from "../fetchApi"

import { AxiosError } from "axios"
import { parseCookies } from 'nookies'

interface createPost {
    post: string
}

export async function createPost(post: createPost) {

    try{
        const cookie = parseCookies()
        const token =  cookie["reths-social-media-token"]

        var response = await fetchApi.post("/post",{
                post: post.post
            },{headers: {authorization: token} })
    }catch(error){
        const err = error as AxiosError
        return err.response?.data
    }

    return response.data
}