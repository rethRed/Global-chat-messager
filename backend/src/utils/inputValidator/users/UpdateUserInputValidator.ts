import { body } from "express-validator"
import { userRepository } from "../../../repositories"

export const UPdateUserInputValidator = [
    //validate the username
    body("username").optional()
    .isLength({ min: 8, max: 255 }).bail()
    .withMessage("invalid length.")
    .custom(async userName => { 
        
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
    }).bail(),

    //validate email
    body("email")
    .optional().bail()
    .isEmail().bail()
    .isLength({ min: 8, max: 255 }).bail()
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
    }).bail(),

    body("password.current_password")
    .optional().bail()
    .isLength({ min: 8, max: 255 }).bail()
    .withMessage("invalid length of the current password."),

    body("password.repeat_password")
    .optional().bail()
    .isLength({ min: 8, max: 255 }).bail()
    .withMessage("invalid length of the repeat password.").bail(),

    body("password.new_password")
    .optional()
    .isLength({ min: 8, max: 255 }).bail()
    .withMessage("invalid length of the new password.").bail(),

    body("password")
    .optional().bail()

    .custom(async password => {

        if(password.current_password != password.repeat_password){
            return Promise.reject("passwords does not match.")
        }

    }).bail(),

    body("img_path").optional(),
    body("description").optional()


] 