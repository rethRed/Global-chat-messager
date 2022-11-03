import { IValidateResponse, buildReponseMessage } from "./validation/Interface";
import { ValidateEmail, ValidatePassword } from "./validation";

interface IvalidateInput{
    email: string,
    password: string
}

export function validateLoginInput(data: IvalidateInput): IValidateResponse{

    var passwordValid = ValidateEmail(data.email)
    if(!passwordValid.success){
        return passwordValid
    }

    var passwordValid = ValidatePassword(data.password)
    if(!passwordValid.success){
        return passwordValid
    }

    return buildReponseMessage("all", "all inputs are valid", true)

}