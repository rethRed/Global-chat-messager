import express  from "express";

import users_router from "./users";
import auth_router from "./auth";
import posts_router from "./posts";

const routes = express.Router()

routes.use("/user", users_router)
routes.use("/auth", auth_router)
routes.use("/post", posts_router)


export default routes