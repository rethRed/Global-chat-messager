import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import CreateUserServices from '../../services/users/CreateUserServices';
import { userRepository } from '../../repositories';

export default async function CreateUserController(req: Request, res: Response){

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    
    const { username, email, password } = req.body

    const response = await CreateUserServices(username, email, password)

    const user_info = await userRepository.getUserInfoById(response.user_id)

    return res.status(201).json({
        success: {
            new_token: response.token,
            data: {
                user_settings: user_info,
            },
            msg: "User created succesfully."
        }})

}