export default function CheckLength(value: string, min: number = 0, max: number = 255) :boolean{

    if(value.length < min || value.length > max){
        return true
    }

    return false
}