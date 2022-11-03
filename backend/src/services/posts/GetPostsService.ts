import { Result } from "express-validator"
import { NOT } from "sequelize/types/deferrable"
import { Raw, } from "typeorm"
import { PostRepository }  from "../../repositories/PostsRepository"

interface options {
    current_page: number
    get_per_page?: number
}

export async function GetPostService({current_page, get_per_page = 15}: options){


    const skip = (current_page - 1)  * get_per_page


    const results = await PostRepository.find({
        relations: {users: true },
        select: {
            users: {
                id: true,
                userName: true,
            },
            
        },
        
        order: {"date": "DESC"}
    })

    return results
}