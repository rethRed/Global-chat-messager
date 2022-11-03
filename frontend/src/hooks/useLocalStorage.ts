import { useEffect, useState } from 'react'

const Prefix = "reths-menssager"

export default function UseLocalStorage(key: string, initialValue?: any ) {
  
    const prefixedKey = Prefix+key

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === "function"){
            return initialValue()
        }else{
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey,JSON.stringify(value))

    }, [prefixedKey, value])

    return [value, setValue]

}
