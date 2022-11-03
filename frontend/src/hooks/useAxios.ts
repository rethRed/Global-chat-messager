import { AxiosDefaults,AxiosError, AxiosInstance, AxiosProxyConfig, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios"
import { useState, useEffect } from "react"

interface Iconfig{
    axiosInstance: AxiosInstance,
    method: string,
    url: string,
    requestConfig: AxiosRequestConfig
}

const useAxios = (configObj: Iconfig) => {
    const{
        axiosInstance,
        method ,
        url,
        requestConfig
    } = configObj

    const [response, setResponse] = useState()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            try{
                setLoading(true)
                const res = await axiosInstance(url,{
                    ...requestConfig,
                    signal: controller.signal,
                    method: method
                })

                console.log(res)
                setResponse(res.data)

            }catch(error){
                const err = error as AxiosError

                console.log(err.message)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => controller.abort()

    },[])

    return [response, error, loading]
}

export default useAxios