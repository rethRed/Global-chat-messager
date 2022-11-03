import { PostRepository, userRepository } from "../../repositories";

export default async function CreatePostService(user_id: number, post: string){


    const user = await userRepository.findOneBy({id: user_id})

    if(!user){
        throw new Error("user not found")
    }

    const newPost = PostRepository.create({
        users: user,
        post: post,
    })

    PostRepository.save(newPost)
}