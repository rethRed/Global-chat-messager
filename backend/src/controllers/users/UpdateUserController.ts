import {  Request, Response } from "express";
import { validationResult } from 'express-validator';
import { userRepository, UserSettingsRepository } from "../../repositories";
import bcrypt from "bcrypt"
import UpdateUserService from "../../services/users/UpdateUserService";

export default async function UpdateUserController(req: Request ,res: Response){


    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const reponse = await UpdateUserService(req)

    if(reponse.error){
        return res.status(400).json(reponse)
    }
    
    return res.status(200).json(reponse)
}