import { body } from "express-validator"
import { userRepository } from "../../../repositories"

export const CreateUserInputValidator = [

    //validate the username
    body("username").exists(),
    body("username").isLength({ min: 8, max: 255 })
    .withMessage("invalid length."),
    body("username").custom(async userName => { 
        
        if(!userName){
            return Promise.reject("userName needs to be valid")
        }
        // check if email exists
        const user = await userRepository.findOneBy({ 
            userName: userName
        })
        if(user){
            return Promise.reject("userName already in use")
        }
        return true
    }),

    //validade the email input
    body("email")
    .exists().bail()
    .isEmail()
    .isLength({ min: 8, max: 255 })
    .withMessage("invalid length.")
    .custom(async email => { 
        // check if email exists
        if(!email){
            return Promise.reject("email needs to be valid")
        }
        
        const user = await userRepository.findOneBy({ 
            email: email
        })
        if(user){
            return Promise.reject("Email already in use")
        }
        return true
    }),
    //validate the password
    body("password")
    .exists().bail()
    .isLength({ min: 8, max: 255 })
    .withMessage("invalid length.")
]


