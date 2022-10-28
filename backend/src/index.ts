import express from "express"

// config .env
import * as dotenv from 'dotenv' 
dotenv.config()

// config database
import { AppDataSource } from "./config/db"

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


const app = express()

import routes from "./routes/index"

app.use(express.json())
app.use(routes)

import { userRepository } from "./repositories"

app.get("/", async (req, res) => {

    var all_users = await userRepository.findOne({
        where: {id: 2}
    })
    return res.json(all_users)
})

app.listen(5000, () => console.log("running on port 5000"))
