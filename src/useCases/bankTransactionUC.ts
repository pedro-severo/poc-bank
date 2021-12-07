import { BankTransaction } from "../entities/bankTransaction"
import Container, { Service } from "typedi"
import { AccountDatabase } from "../services/database/account/accountDatabase"

@Service()
export class BankTransactionUC {
    accountDb: AccountDatabase

    constructor() {
        this.accountDb = Container.get(AccountDatabase)
    }
    
    // TODO: to type response
    async execute(transaction: BankTransaction): Promise<any> {
        try {
            await this.accountDb.handleInternalTransaction(transaction)
            return Promise.resolve({
                Success: true,
                Message: "Transaction done successfully"
            })
        } catch (err) {
            throw new Error("")
        }

    }
}