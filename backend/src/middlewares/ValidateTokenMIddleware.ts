import { NextFunction, Request, Response } from "express";
import { UserTokenRepository } from "../repositories";
import { UserTokens } from "../models/entities";
import jwt  from "jsonwebtoken";


export default async function ValidateTokenMiddleware(req: Request ,res: Response, next: NextFunction){

    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({ error: { msg: "invalid token." } })    
    }

    const jwtSecret = String(process.env.JWT_TOKEN_SECRET)

    try{
        jwt.verify(authorization, jwtSecret)

    }catch(err){
        return res.status(401).json({ error: { msg: "invalid token." } })    
    }
    //get token info
    const tokenRepo = await UserTokenRepository.findOne(
        { 
            relations:{
                users: true
            },
            where: {token: authorization }
        })

    if(!tokenRepo){
        return res.status(401).json({ error: { msg: "invalid token." } })    
    }

    //not the best pratice !!!!!!!!
    req.tokenRepo = tokenRepo

    next()
}