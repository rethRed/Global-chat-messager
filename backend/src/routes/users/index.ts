import express  from "express";

import { CreateUserController, GetUserController, DeleteUserController, UpdateUserController } from "../../controllers/users";
import { CreateUserInputValidator } from "../../utils/inputValidator";
import { UPdateUserInputValidator } from "../../utils/inputValidator/users/UpdateUserInputValidator";
import { ValidateTokenMiddleware } from "../../middlewares";


const users_router = express.Router()

users_router.post("/", CreateUserInputValidator, CreateUserController)
users_router.get("/", ValidateTokenMiddleware, GetUserController )
users_router.delete("/", ValidateTokenMiddleware, DeleteUserController)
users_router.patch("/",ValidateTokenMiddleware, UPdateUserInputValidator , UpdateUserController )

export default users_router