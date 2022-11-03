import { AppDataSource } from "../config/db";
import { Likes } from "../models/entities";

export const LikeRepository = AppDataSource.getRepository(Likes)