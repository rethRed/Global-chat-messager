import { Request } from "express"
import { userRepository, UserSettingsRepository } from "../../repositories"
import bcrypt from "bcrypt"

export default async function UpdateUserService(req: Request){

    //not the best pratice !!!!!!!!
    var user_id = req.tokenRepo.users.id

    const { username, email, password, img_path, description } = req.body

    var toBeUpdated = {}
    var settingsToBeUpdated = {}

    //update
    if(username){
        toBeUpdated = {...toBeUpdated, userName: username }
    }
    if(email){
        toBeUpdated = {...toBeUpdated, email: email }
    }
    if(password){

        const user = await userRepository.findOne({
            select:{password: true,},
            where: {id: user_id}
        }) 
        if(!user){
            return {error: {msg: "something went wrong when finding the user"}}
        }

        if(!await bcrypt.compare( password.current_password, user?.password)){
            return {error: {msg: "your provided password doesn't match the current one. "}}
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const newHash_password = await bcrypt.hash(password.new_password, salt) 
        toBeUpdated = {...toBeUpdated, password: newHash_password}
    }
    if(img_path){
        console.log("img_path ", img_path)
        settingsToBeUpdated = {...settingsToBeUpdated, img_path: img_path }
    }
    if(description){
        console.log("description: ", description)
        settingsToBeUpdated = {...settingsToBeUpdated, description: description }
    }



    if(Object.keys(toBeUpdated).length != 0){
        await userRepository.update({id: user_id}, toBeUpdated)
    }
    if(Object.keys(settingsToBeUpdated).length != 0){
        await UserSettingsRepository.update({users: user_id}, settingsToBeUpdated )
    }

    return {success: {msg: "User updated"}}
}