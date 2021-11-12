import { users } from "../data/users"
import { BankTransaction } from "../entities/bankTransaction"
import { User } from "../entities/user"

export class BankTransactionUC {
    
    // TODO: to type response
    async execute(transaction: BankTransaction, sourceUserId: string, targetUserId: string): Promise<any> {
        try {
            await this.handleTransaction(transaction, sourceUserId, targetUserId)
            return Promise.resolve({
                Success: true,
                Message: "Transaction done successfully"
            })
        } catch (err) {
            throw new Error("")
        }

    }

    // TODO: once database implemented, abstract this methods in a DATABASE class
    private async handleTransaction(transaction: BankTransaction, sourceUserId: string, targetUserId: string) {
        try {            
            const sourceUser = await this.getUser(sourceUserId)
            const targetUser = await this.getUser(targetUserId)
            if (sourceUser && targetUser && sourceUser.balance >= transaction.value) {
               await this.updateUser(transaction, sourceUserId, sourceUser, true)
               await this.updateUser(transaction, targetUserId, targetUser)
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
    private async updateUser(transaction: BankTransaction, userId: string, user: User, isSourceUser?: boolean) {
        const indexToRemove = users.findIndex(user => user.id === userId)
        if (isSourceUser) user.balance -= transaction.value
        else user.balance += transaction.value
        user.bankStatement.push(transaction)
        users.splice(indexToRemove, 1, user)
    }
}