import fetchApi from "../fetchApi"

import { AxiosError } from "axios"
import { parseCookies } from 'nookies'


export async function getMenssagers(){
    try{
        const cookie = parseCookies()
        const token =  cookie["reths-social-media-token"]

        var response = await fetchApi.get("/post",{
            data: {

            },
                headers: {authorization: token}
            })
            
    }catch(error){
        const err = error as AxiosError
        return err.response?.data
    }

    return response.data
}