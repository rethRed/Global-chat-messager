import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import CreateUserServices from '../../services/users/CreateUserServices';

export default async function CreateUserController(req: Request, res: Response){

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, email, password } = req.body

    const response = await CreateUserServices(username, email, password)

    return res.status(201).json({
        success: {
        new_token: response.token,
        user_settings: response.user_id,
        msg: "User created succesfully."
    }})

}