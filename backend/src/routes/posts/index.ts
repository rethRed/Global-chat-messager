import express  from "express";

import { CreatePostsController, GetPostsController } from "../../controllers/posts";
import { CreatePostsInputValidator } from "../../utils/inputValidator";
import { ValidateTokenMiddleware } from "../../middlewares";


const posts_router = express.Router()

posts_router.post("/", CreatePostsInputValidator, ValidateTokenMiddleware, CreatePostsController )
posts_router.get("/", ValidateTokenMiddleware, GetPostsController  )
posts_router.delete("/", ValidateTokenMiddleware, )
posts_router.patch("/",ValidateTokenMiddleware,   )

export default posts_router