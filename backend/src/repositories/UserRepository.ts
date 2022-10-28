import { AppDataSource } from "../config/db";
import { Users } from "../models/entities";

export const userRepository = AppDataSource.getRepository(Users).extend({

    getUserInfoById(user_id: number){

        return this.createQueryBuilder("users")
            .leftJoinAndSelect("users.userSettings_id", "user_settings")
            // .where("users.id = :user_id", { user_id: user_id })
            .getOne()
    }

})


