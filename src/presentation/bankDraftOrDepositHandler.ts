import { RequestHandler } from "express"
import { v4 } from "uuid"
import { TransitionType } from "../entities/abstractEntities/genericBankTransition"
import { AccountAction } from "../entities/accountAction"
import { BankDraftOrDepositUC } from "../useCases/bankDraftOrDepositUC"

export const bankDraftOrDepositHandler: RequestHandler =  async (req, res) => {
    try {
        const { actionType, value, description } = req.body
        const { userId } = req.params
        const id = v4()
        const accountAction = new AccountAction(
            value,
            id,
            new Date(),
            Number(actionType) as unknown as TransitionType,
            description
        )
        const useCase = new BankDraftOrDepositUC()
        const response = await useCase.execute(accountAction, userId)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: "It was not possible to complete this action.",
            error: err,
        })
    }
}