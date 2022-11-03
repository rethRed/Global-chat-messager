import { AppDataSource } from "../config/db";
import { Users, UserSettings } from "../models/entities";

export const userRepository = AppDataSource.getRepository(Users).extend({

    getUserInfoById(user_id: number){

        return AppDataSource.createQueryBuilder(UserSettings ,"user_settings")
            .leftJoinAndSelect("user_settings.users", "users" )
            .where("users.id = :user_id", { user_id: user_id })
            .getOne()

    }

})


