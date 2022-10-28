import { AppDataSource } from "../config/db";
import { UserSettings } from "../models/entities/UserSettings";

export const UserSettingsRepository = AppDataSource.getRepository(UserSettings)
