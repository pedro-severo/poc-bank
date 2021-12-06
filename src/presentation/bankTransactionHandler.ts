import { RequestHandler } from "express"
import { v4 } from "uuid"
import { BankTransaction } from './../entities/bankTransaction';
import { TransitionType } from "../entities/abstractEntities/genericBankTransition";
import { BankTransactionUC } from "../useCases/bankTransactionUC";
import Container from "typedi";

export const bankTransactionHandler: RequestHandler = async (req, res) => {
    try {
        const { actionType, value, description } = req.body
        const { sourceAccountId, targetAccountId } = req.params
        const id = v4()
        const accountAction = new BankTransaction(
            value,
            id,
            new Date(),
            actionType as TransitionType,
            sourceAccountId,
            targetAccountId,
            description
        )
        const useCase = Container.get(BankTransactionUC)
        const response = await useCase.execute(accountAction)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: "It was not possible to complete this action.",
            error: err,
        })
    }
}