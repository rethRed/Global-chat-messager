import styles from "../../styles/components/inputs/Input.module.scss"
import React, { ChangeEvent } from 'react';

interface IProps {
    onChange(value: string) : void,
    placeholder?: string,
    type?:string

}

export default function InputComponent({ onChange, placeholder, type = "text"  }: IProps ){

    function change(e: ChangeEvent<HTMLInputElement>){
        onChange(e.target.value)
    }
    return (
        <>
            <input  className={"fs-3 "+styles.main} 
            onChange={change} 
            placeholder={placeholder}
            type={type}
            />
        </>

            
    )
}