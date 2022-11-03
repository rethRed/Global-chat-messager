import { IValidateResponse, buildReponseMessage } from "./validation/Interface";
import { ValidateEmail, ValidateUsername, ValidatePassword } from "./validation";

interface IvalidateInput{
    username: string,
    email: string,
    password: string
}

export function validateRegisterInput(data: IvalidateInput): IValidateResponse{

    var usernameValid = ValidateUsername(data.username)
    if(!usernameValid.success){
        return usernameValid
    }

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