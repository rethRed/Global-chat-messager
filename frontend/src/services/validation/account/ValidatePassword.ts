import CheckLength from "../CheckLength";
import {IValidateResponse, buildReponseMessage} from "../Interface";

export default function ValidatePassword(password: string) :IValidateResponse{

    if(CheckLength(password, 8, 255)){
        return buildReponseMessage("password","invalid lenght on password", false )
    }

    return  buildReponseMessage("password","password valid", true )

}