import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from "bcrypt"
import { userRepository } from '../../repositories';
import { CreateToken } from '../../utils/TokenManegement';

export default async function LoginController(req: Request, res: Response){

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    const user = await userRepository.findOne({
        
        select:{
            password: true,
            id: true,
            
        },
        where: {
            email: email
        }
    }) 


    //check if user exists
    if(!user){
        return res.status(400).json({
            error: { msg: "Email or password is invalid." }
        })
    }
    //check if password matches
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).json({
            error: { msg: "Email or password invalid" }
        })
    }

    //create the token
    const token = await CreateToken(user.id)
    const userInfo = await userRepository.getUserInfoById(user.id)


    return res.status(200).json({
        success: {
            new_token: token,
            data: {
                user_settings: userInfo
            },
            msg: "User Logged succesfully."
        }})


}