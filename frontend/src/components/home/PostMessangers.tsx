import styles from "../../styles/components/home/PostMenssagers.module.scss"

import { useRef, useState } from "react"
import { useMutation } from 'react-query'
import { Backdrop, CircularProgress } from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';

import ButtonComponent from "../inputs/ButtonComponent"
import TextAreaComponent from "../inputs/TextAreaComponent"
import { createPost } from "../../apis/fetch/fetchPost"
import { ReadableStreamDefaultController } from "stream/web";

export default function PostMessagers(){

    const [post, setPost] = useState<string>("")


    const { mutate, isLoading } = useMutation(() => createPost(
        {post: post,}),{
            onSuccess: (data: any) => response(data),
            }
    )

    function response(data: any){

        if(data.errors || data.error){
            toast.error(data.errors[0]?.msg || data.error?.msg)
            return
        }else if(data.success){
            setPost("")
            toast.success("Successfully posted.")
            return
        }


    }

    function postMenssage(){
        if(!post){
            return toast.warn("The Post can't be empty ")
        }

        mutate()

    }

    return (
        <div className="w-100 rounded-3  p-3" id={styles.post_Menssagers}>

            <ToastContainer />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="h3">Post Menssage </div>

            <TextAreaComponent value={post} onChange={(value) => setPost(value)}/>

            <div className="mt-3">
                <ButtonComponent text="Submit" disabled={isLoading} onClick={postMenssage}/>
            </div>

        </div>
    )
}