import { RequestHandler } from "express"
import { users } from "../database/users"

export const getUsersHandlers: RequestHandler = async (req, res) => {
    res.json(users)
}