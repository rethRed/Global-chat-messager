import { AppDataSource } from "../config/db";
import { UserTokens } from "../models/entities";

export const UserTokenRepository = AppDataSource.getRepository(UserTokens)
