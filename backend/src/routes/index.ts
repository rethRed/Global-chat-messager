import express  from "express";

import users_router from "./users";

const routes = express.Router()

routes.use("/user",users_router)


export default routes