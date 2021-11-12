import { RequestHandler } from "express"
import { v4 } from "uuid"
import { BankTransaction } from './../entities/bankTransaction';
import { TransitionType } from "../entities/abstractEntities/genericBankTransition";
import { BankTransactionUC } from "../useCases/bankTransactionUC";

export const bankTransactionHandler: RequestHandler = async (req, res) => {
    try {
        const { actionType, value, description } = req.body
        const { sourceUserId, targetUserId } = req.params
        const id = v4()
        const accountAction = new BankTransaction(
            value,
            id,
            new Date(),
            Number(actionType) as unknown as TransitionType,
            description
        )
        const useCase = new BankTransactionUC()
        const response = await useCase.execute(accountAction, sourceUserId, targetUserId)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: "It was not possible to complete this action.",
            error: err,
        })
    }
}