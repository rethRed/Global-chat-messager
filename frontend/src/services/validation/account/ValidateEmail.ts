import CheckLength from "../CheckLength";

import {IValidateResponse, buildReponseMessage} from "../Interface";

export default function ValidateEmail(email: string): IValidateResponse{

    if(CheckLength(email, 8, 255)){
        return buildReponseMessage("email","invalid lenght on email", false ) 
    }

    //check email format valid
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(!emailRegex.test(email)){
        return buildReponseMessage("email","invalid email", false ) 
    }

    return buildReponseMessage("email","email valid", true ) 


}