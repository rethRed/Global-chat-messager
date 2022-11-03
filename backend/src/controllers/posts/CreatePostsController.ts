import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import CreatePostService from '../../services/posts/CreatePostService';

export default async function CreatePostsController(req: Request, res: Response){

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //not the best pratice !!!!!!!!
    var user_id = req.tokenRepo.users.id

    const { post } = req.body
    
    
    const new_post = await CreatePostService(user_id, post)

    return res.status(201).json({
        success: {
            data: {
                post: new_post
            }
        }
    })

}