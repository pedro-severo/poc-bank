import { users } from "../database/users"
import { Payment } from "../entities/payment"
import { User } from "../entities/user"

export class PaymentUC {

    // TODO: to type response
    async execute(payment: Payment, userId: string): Promise<any> {
        try {
            const updatedUser = await this.handlePayment(payment, userId)
            return Promise.resolve({
                Success: true,
                Message: "Payment done successfully",
                User: updatedUser,
            })
        } catch (err) {
            throw new Error("")
        }

    }

    // TODO: once database implemented, abstract this methods in a DATABASE class
    private async handlePayment(payment: Payment, userId: string) {
        try {            
            const user = await this.getUser(userId)
            const indexToRemove = users.findIndex(user => user.id === userId)
            if (user) {
                if (payment.isASchedule || payment.value <= user.balance) {
                    user.bankStatement.push(payment)
                    if (!payment.isASchedule) user.balance -= payment.value
                    users.splice(indexToRemove, 1, user)
                    return user
                } else {
                    throw new Error("User doesn't have enough money")
                }
            }
        } catch (err) {
            throw new Error("")
        }
    }
    private async getUser(id: string): Promise<User> {
        try {
            const user = users.find(user => user.id === id)
            if (user) return user
            else throw new Error("User not found.")
        } catch (err) {
            throw new Error("")
        }
    }
}