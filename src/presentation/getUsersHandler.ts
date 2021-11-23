import { RequestHandler } from "express"
import Container from "typedi"
import { GetUsersUC } from "../useCases/getUsersUC"

export const getUsersHandlers: RequestHandler = async (req, res) => {
    try {
        const useCase = Container.get(GetUsersUC)
        const response = await useCase.execute()
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: 'Not found.',
            error: err,
        })
    }
}