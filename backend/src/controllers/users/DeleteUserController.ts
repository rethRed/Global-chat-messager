import {  Request, Response } from "express";
import { userRepository } from "../../repositories";

export default async function DeleteUserController(req: Request ,res: Response){

    //not the best pratice !!!!!!!!
    var user_id = req.tokenRepo.users.id

    await userRepository.delete({id: user_id})


    return res.status(200).json({
        success: {
            data: {

            },
            msg: `User deleted`

        }
    })
}