import express  from "express";

import { LoginController, TokenValidController } from "../../controllers/auth";
import { LoginInputValidator } from "../../utils/inputValidator";
import { ValidateTokenMiddleware } from "../../middlewares";

const auth_router = express.Router()

auth_router.post("/login", LoginInputValidator, LoginController)
auth_router.post("/token-valid",ValidateTokenMiddleware, TokenValidController)

export default auth_router