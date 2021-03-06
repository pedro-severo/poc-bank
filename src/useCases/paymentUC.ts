import { Payment } from "../entities/payment"
import Container, { Service } from "typedi"
import { AccountDatabase } from "../services/database/account/accountDatabase"

@Service()
export class PaymentUC {
    accountDb: AccountDatabase

    constructor() {
        this.accountDb = Container.get(AccountDatabase)
    }

    // TODO: to type response
    async execute(payment: Payment): Promise<any> {
        try {
            const updatedUser = await this.accountDb.handlePayment(payment)
            return Promise.resolve({
                Success: true,
                Message: "Payment done successfully",
                User: updatedUser,
            })
        } catch (err) {
            throw new Error("")
        }

    }
}