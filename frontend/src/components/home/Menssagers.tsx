import styles from "../../styles/components/home/Menssagers.module.scss"

import { useInfiniteQuery, useQuery } from "react-query"

import React, { useEffect, useRef, useState } from "react"
import PagesManifestPlugin from "next/dist/build/webpack/plugins/pages-manifest-plugin"
import { Backdrop, CircularProgress } from "@mui/material"

import { getMenssagers } from "../../apis/fetch/fetchHome"

interface receivedData {
    id: number,
    date: string,
    post: string,
    users: {
        id: number,
        userName: string
    }
}

export default function Menssagers(){


    const current_page = useRef<number>(1)

    const { data: posts, isFetching  } = useQuery("messagers", () => getMenssagers())   

    return (
        <div className="h-100">

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isFetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
            
                {posts && posts.success.data.posts.map((post: receivedData, i: number) => (

                    <div key={i} className={"p-3 m-4 rounded-3  "+styles.main}>
                        <div className=" d-flex justify-content-between">
                            <span className="h5 fs-4">{post.users.userName} </span>
                            <span className="text-muted fs-6">{new Date(post.date).toLocaleString("en-US")}</span>
                        </div>
                        <div className="pt-4">
                            {post.post}
                        </div>
                    </div>
                        
                )) }

            
        </div>
    )
}