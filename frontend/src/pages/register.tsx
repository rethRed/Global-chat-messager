import styles from "../styles/Register.module.scss"
import ButtonComponent from "../components/inputs/ButtonComponent"
import InputComponent from "../components/inputs/InputComponent"
import TitleComponent from "../components/utils/TitleComponent"

import { useState } from "react"
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify';
import { setCookie } from 'nookies'
import Router from "next/router"
import Link from "next/link"
import Head from 'next/head'

import { validateRegisterInput } from "../services/RegisterService"
import { createUser } from "../apis/fetch/fetchUsers"
import { Backdrop, CircularProgress } from "@mui/material"


export default function Register(){

    
    const [userName, setUserName ] = useState<string>("")
    const [email, setEmail ] = useState<string>("")
    const [password, setPassword ] = useState<string>("")

    const { mutate, isLoading } = useMutation(() => createUser(
        {
            username: userName,
            email: email,
            password: password
        }),{ 
            onSuccess: (data: any) => userCreated(data),
        })


    function userCreated(data: any){

        if(data.errors || data.error){
            toast.warn(data.errors[0]?.msg || data.error?.msg)
            return 
        }else if(data.success){

            setCookie(null, "reths-social-media-token",data.success.new_token , {
                maxAge: 60 * 60 * 24 * 20,
            })
            Router.push("/")
        }

    }

    async function register(){

        var validateFields = validateRegisterInput({
            username: userName, email: email, password: password
        })
        
        if(!validateFields.success){
            return toast.warn(validateFields.msg)
        }
        mutate()
    }


    return (
        <div className={"d-flex w-100 vh-100 justify-content-center align-items-center "+styles.main}>

            <Head>
                <title>Register</title>
            </Head>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <ToastContainer />

            <div className={"w-100 d-flex justify-content-center flex-column "+styles.input_container}>
                
                <div className="d-flex justify-content-center my-3">
                    <TitleComponent title="Register"/>
                </div>

                <div className="d-flex justify-content-center my-3">
                    <InputComponent placeholder="UserName" 
                    onChange={username => setUserName(username)} />
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
                    <p >Already has an account? <Link href="/login">click here</Link></p>
                </div>

                <div className="mb-3 d-flex justify-content-center  ">
                    <ButtonComponent text="Register" onClick={register}/>
                </div>
            </div>

        </div>
    )
}