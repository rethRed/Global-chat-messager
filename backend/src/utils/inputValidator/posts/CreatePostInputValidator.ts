import { body } from "express-validator"

export const CreatePostsInputValidator = [
    body("post").exists()
    .isLength({max: 2000})
]