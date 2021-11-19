import { RequestHandler } from "express"
import { users } from "../database/users"
import { GetUserDetailUC } from "../useCases/getUserDetailUC"

export const getUserDetailHandler: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params
        const useCase = new GetUserDetailUC()
        const response = await useCase.execute(id)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: 'User not found.',
            error: err,
        })
    }
}