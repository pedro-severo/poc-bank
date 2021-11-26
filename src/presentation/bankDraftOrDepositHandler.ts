import { RequestHandler } from "express"
import Container from "typedi"
import { v4 } from "uuid"
import { TransitionType } from "../entities/abstractEntities/genericBankTransition"
import { AccountAction } from "../entities/accountAction"
import { BankDraftOrDepositUC } from "../useCases/bankDraftOrDepositUC"

export const bankDraftOrDepositHandler: RequestHandler =  async (req, res) => {
    try {
        const { actionType, value, description } = req.body
        const { accountId } = req.params
        const id = v4()
        const accountAction = new AccountAction(
            value,
            id,
            new Date(),
            actionType,
            accountId,
            description
        )
        const useCase = Container.get(BankDraftOrDepositUC)
        const response = await useCase.execute(accountAction)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: "It was not possible to complete this action.",
            error: err,
        })
    }
}