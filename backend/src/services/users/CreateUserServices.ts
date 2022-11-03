import { userRepository, UserTokenRepository, UserSettingsRepository } from "../../repositories";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { CreateToken } from "../../utils/TokenManegement";

type IcreatedUser = {
    token: string,
    user_id: number
  };

export default async function CreateUserServices(username: string, email: string, password: string): Promise<IcreatedUser> {
    
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(password, salt) 

    //create the new user with its settings

    const newUser = userRepository.create({
        userName: username,
        email: email,
        password: hash_password,        

    })
    await userRepository.save(newUser)
    
    const newUserSettings = UserSettingsRepository.create({
        img_path: "",
        description: "",
        users: newUser
    })

    await UserSettingsRepository.save(newUserSettings)

    //generates token
    const user_id = newUser.id
    
    const token = await CreateToken(user_id)

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