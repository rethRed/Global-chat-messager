import { DataSource } from "typeorm"

import { Users, UserTokens, UserSettings, Posts, Likes } from "../models/entities"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    // port: 3006,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,

    entities: [ 
        Users,
        UserTokens,
        UserSettings,
        Posts, 
        Likes
        
    ],
    migrations: []
})

