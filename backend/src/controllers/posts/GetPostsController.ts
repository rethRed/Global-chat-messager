import { Request, Response } from "express";
import { GetPostService } from "../../services/posts/GetPostsService";

export default async function GetPostsController(req: Request, res: Response){

    var { current_page } = req.body

    if(!current_page || isNaN(current_page*1)){
        current_page = 1
    }

    current_page = parseInt(current_page)

    const posts = await GetPostService(
        {
            current_page: current_page
        })

    return res.status(200).json({
        success: {
            data: {
                posts: posts
            }
        }
    })
}