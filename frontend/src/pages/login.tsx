import styles from "../styles/Login.module.scss"

import ButtonComponent from "../components/inputs/ButtonComponent"
import InputComponent from "../components/inputs/InputComponent"
import TitleComponent from "../components/utils/TitleComponent"

import { useState } from "react"
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify';
import { setCookie } from 'nookies'
import Router from "next/router"
import Link from "next/link"

import { validateLoginInput } from "../services/LoginService"
import { loginUser } from "../apis/fetch/fetchUsers"
import { Backdrop, CircularProgress } from "@mui/material"
import Head from 'next/head'

export default function Login(){

    const [email, setEmail ] = useState<string>("")
    const [password, setPassword ] = useState<string>("")

    const { mutate, isLoading } = useMutation(() => loginUser(
        {
            email: email,
            password: password
        }),{ 
            onSuccess: (data: any) => userLogged(data),
            }
    )


    function userLogged(data: any){

        if(data.errors ){
            toast.warn( data.error?.msg || data.errors[0].msg)
            return 
        }else if(data.success){

            setCookie(null, "reths-social-media-token",data.success.new_token , {
                maxAge: 60 * 60 * 24 * 20,
            })
            Router.push("/")
        }

    }

    async function login(){

        var validateFields = validateLoginInput({
             email: email, password: password
        })
        
        if(!validateFields.success){
            return toast.warn(validateFields.msg)
        }
        mutate()
    }

    return (


        <div className={"d-flex w-100 vh-100 justify-content-center align-items-center "+styles.main}>

            <Head>
                <title>Login</title>
            </Head>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <ToastContainer />
            <div className={"w-100 d-flex justify-content-center flex-column "+styles.input_container}>
                
                <div className="d-flex justify-content-center my-3">
                    <TitleComponent title="Login"/>
                </div>

                <div className="d-flex justify-content-center mb-3">
                    <InputComponent placeholder="E-mail" 
                    onChange={email => setEmail(email)}/>
                </div>
 
                <div className="d-flex justify-content-center mb-3">
                    <InputComponent  placeholder="Password" 
                    type="password"
                    onChange={password => setPassword(password)}/>
                </div>

                <div className="d-flex justify-content-end me-5 my-1 ">
                    <p >Still doesn&apos;t an account? <Link href="/register">click here</Link></p>
                </div>

                <div className="mb-3 d-flex justify-content-center  ">
                    <ButtonComponent text="Login" onClick={login}/>
                </div>
            </div>

        </div>
    )
}