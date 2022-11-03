import { AppDataSource } from "../config/db";
import { Posts } from "../models/entities";

export const PostRepository = AppDataSource.getRepository(Posts)