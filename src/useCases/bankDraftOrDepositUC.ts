import { users } from "../data/users";
import { AccountAction, AccountActionType } from "../entities/accountAction";
import { User } from "../entities/user";

export class BankDraftOrDepositUC {

    // TODO: to type response
    async execute(accountAction: AccountAction, userId: string): Promise<any> {
        try {
            const updatedUser = await this.handleNewAccountAction(accountAction, userId)
            return Promise.resolve({
                Success: true,
                Message: "User created successfully",
                User: updatedUser,
            })
        } catch (err) {
            throw new Error("")
        }

    }

    // TODO: once database implemented, abstract this methods in a DATABASE class
    private async handleNewAccountAction(accountAction: AccountAction, userId: string) {
        try {            
            const user = await this.getUser(userId)
            const indexToRemove = users.findIndex(user => user.id === userId)
            if (user) {
                switch (accountAction.type) {
                    case AccountActionType.DEPOSIT:
                        user.balance += accountAction.value
                        break
                    case AccountActionType.DRAFT: 
                        if (user.balance >= accountAction.value) user.balance -= accountAction.value
                        else throw new Error("You don't have enough money.")
                        break
                    default:
                        throw new Error("Account action not found.")
                }
                user.bankStatement.push(accountAction)
                users.splice(indexToRemove, 1, user)
                return user
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