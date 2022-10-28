import { userRepository, UserTokenRepository, UserSettingsRepository } from "../../repositories";
import { UserSettings } from "../../models/entities";
import jwt from "jsonwebtoken"
import { Repository } from "typeorm";

type IcreatedUser = {
    token: string,
    user_id: number
  };

export default async function CreateUserServices(username: string, email: string, password: string): Promise<IcreatedUser> {
    
    //create the new user with its settings
    const newUser = userRepository.create({
        userName: username,
        email: email,
        password: password
    })
    await userRepository.save(newUser)
    
    const newUserSettings = UserSettingsRepository.create({
        users: newUser,
        img_path: "",
        description: ""
    })

    await UserSettingsRepository.save(newUserSettings)

    //generates token
    const user_id = newUser.id
    const token = generateToken(user_id)

    const newToken = UserTokenRepository.create({
        users: newUser,
        token: token
    })
    await UserTokenRepository.save(newToken)

    console.log(await userRepository.getUserInfoById(user_id))

    return {
        token: token,
        user_id: user_id
    }
}

function generateToken(user_id: number): string {

    let jwtSecretKey = String(process.env.JWT_TOKEN_SECRET)
    let data = {
        time: Date(),
        userId: user_id,
    }
  
    const token = jwt.sign(data, jwtSecretKey)

    return token
}