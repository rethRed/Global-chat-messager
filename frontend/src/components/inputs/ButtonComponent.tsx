import styles from "../../styles/components/inputs/Button.module.scss"
import React, { ChangeEvent } from 'react';

interface IProps {
    text?: string,
    onClick?: () => void,
    disabled?: boolean
}

export default function ButtonComponent({text, onClick, disabled = false }: IProps ){

    return (
        <button disabled={disabled} className={"fs-4 "+styles.main} 
        onClick={onClick}>
            {text}
        </button>
    )
}