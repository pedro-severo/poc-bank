import { AccountAction } from "../entities/accountAction";
import Container, { Service } from "typedi";
import { AccountDatabase } from "../services/database/account/accountDatabase";
@Service()
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
}