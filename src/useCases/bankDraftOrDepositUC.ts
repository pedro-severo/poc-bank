import { users } from "../services/database/users";
import { TransitionType } from "../entities/abstractEntities/genericBankTransition";
import { AccountAction } from "../entities/accountAction";
import { User } from "../entities/user";
import Container, { Service } from "typedi";
import { AccountDatabase } from "../services/database/account/accountDatabase";

// TODO: Fix ts-ignore
@Service()
// @ts-ignore
export class BankDraftOrDepositUC {
    accountDb: AccountDatabase

    constructor() {
        this.accountDb = Container.get(AccountDatabase)
    }

    // TODO: to type response
    async execute(accountAction: AccountAction): Promise<any> {
        try {
            const updatedUser = await this.accountDb.handleNewAccountAction(accountAction)
            return Promise.resolve({
                Success: true,
                Message: "Bank transition done successfully",
                User: updatedUser,
            })
        } catch (err) {
            throw new Error("")
        }

    }

    // TODO: once database implemented, abstract this methods in a DATABASE class

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