import styles from "../../styles/components/inputs/TextArea.module.scss"

import React, { ChangeEvent, LegacyRef, useRef } from 'react';


interface props {
    onChange(value: string) : void,
    rows?: number,
    value?: string
}

export default function TextAreaComponent({ onChange, rows=5, value }: props){


    function change(e: any){
        onChange(e.target.value)
    }



    return (
        <>
            <textarea  value={value} maxLength={2000} className={"w-100 rounded-3 "+styles.area} 
            onChange={change}
             rows={rows}></textarea>
        </>
    )
}