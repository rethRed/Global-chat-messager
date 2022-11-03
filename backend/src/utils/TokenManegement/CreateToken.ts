import jwt from "jsonwebtoken"
import { UserTokenRepository, userRepository } from "../../repositories"


export default async function CreateToken(user_id: number, insertDataBase: boolean = true): Promise<string> {


    const token = generateToken(user_id)

    if(insertDataBase){

        const user = await userRepository.findOneBy({ id: user_id })
        
        if(!user){
            return token
        }

        const newToken = UserTokenRepository.create({
            users: user,
            token: token
        })
        await UserTokenRepository.save(newToken)
    }


    return token

}


function generateToken(user_id: number): string {

    let jwtSecretKey = String(process.env.JWT_TOKEN_SECRET)
    let expirationTime = String(process.env.JWT_TOKEN_EXPIRATION_TIME)
    
    let data = {
        time: Date(),
        userId: user_id,
    }
  
    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: expirationTime
    })

    return token
}