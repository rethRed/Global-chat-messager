import CheckLength from "../CheckLength";
import {IValidateResponse, buildReponseMessage} from "../Interface";

export default function ValidateUsername(username: string) :IValidateResponse{

    if(CheckLength(username, 8, 255)){
        return buildReponseMessage("username","invalid lenght on username", false )
    }

    return  buildReponseMessage("username","username valid", true )

}