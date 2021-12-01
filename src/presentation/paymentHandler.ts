import { RequestHandler } from "express"
import Container from "typedi"
import { v4 } from "uuid"
import { TransitionType } from "../entities/abstractEntities/genericBankTransition"
import { Payment } from "../entities/payment"
import { PaymentUC } from "../useCases/paymentUC"
import { checkPresentOrFutureDate } from "../utils/checkPresentOrFutureDate"
import { mapPtBrDateToUsDate } from "../utils/mapPtBrDateToUsDate"

export const paymentHandler: RequestHandler = async (req, res) => {
    try {
        const { actionType, paymentType, value, description, date } = req.body
        const usDate = date && mapPtBrDateToUsDate(date)
        const isValidDate = usDate && checkPresentOrFutureDate(new Date(usDate))
        if (usDate && !isValidDate) {
            res.status(400).json({
                message: 'Input validation error.',
                err: "Date should be in present or future.",
            })
            return
        }
        const { accountId } = req.params
        const id = v4()
        const accountAction = new Payment(
            paymentType,
            value,
            id,
            usDate ? new Date(usDate) : new Date(),
            actionType as TransitionType,
            accountId,
            !!usDate,
            description
        )
        const useCase = Container.get(PaymentUC)
        const response = await useCase.execute(accountAction)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: "It was not possible to complete this action.",
            error: err,
        })
    }
}