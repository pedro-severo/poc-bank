import { RequestHandler } from "express"
import { users } from "../data/users"

export const getUsersHandlers: RequestHandler = async (req, res) => {
    res.json(users)
}