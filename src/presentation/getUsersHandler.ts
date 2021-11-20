import { RequestHandler } from "express"
import { users } from "../services/database/users"

export const getUsersHandlers: RequestHandler = async (req, res) => {
    res.json(users)
}