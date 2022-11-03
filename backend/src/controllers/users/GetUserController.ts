import {  Request, Response } from "express";
import { userRepository } from "../../repositories";

export default async function GetUserController(req: Request ,res: Response){

    //not the best pratice !!!!!!!!
    var user_id = req.tokenRepo.users.id

    const user = await userRepository.getUserInfoById(user_id)

    return res.status(200).json({
        success: {
            data: {
                settings: user
            }
        }
    })
}