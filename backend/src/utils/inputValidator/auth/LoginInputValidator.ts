import { body } from "express-validator"

export const LoginInputValidator = [

    //validate email
    body("email")
    .exists().bail()
    .isEmail()
    .isLength({ min: 8, max: 255 })
    .withMessage("invalid length."),

    //validate password
    body("password")
    .exists().bail()
    .isLength({ min: 8, max: 255 })
    .withMessage("invalid length.")


]
