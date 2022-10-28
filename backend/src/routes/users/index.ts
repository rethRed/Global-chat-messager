import express  from "express";

import { CreateUserController } from "../../controllers/users";
import { CreateUserInputValidator } from "../../utils/inputValidator";

const users_router = express.Router()

users_router.post("/", CreateUserInputValidator, CreateUserController)


export default users_router