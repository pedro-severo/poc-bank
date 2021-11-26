import { Service } from "typedi";
import { v4 } from "uuid";
import { TransitionType } from "../../../entities/abstractEntities/genericBankTransition";
import { AccountAction } from "../../../entities/accountAction";
import { mapDateToSqlDate } from "../../../utils/mapDateToSqlDate";
import connection from "../databaseConnection";

@Service()
// @ts-ignore
export class AccountDatabase {


    async create(userId: string) {
        try {
            const accountId = v4()
            await connection("accounts").insert({
                id: accountId, 
                balance: 0,
                user_id: userId
            })
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("");
        }
    }

    async handleNewAccountAction(accountAction: AccountAction) {
        try {            
            const { id, value, type, date, accountId, description } = accountAction
            await connection("drafts_and_deposits").insert({
                id,
                value, 
                type, 
                date: mapDateToSqlDate(date), 
                description,
                account_id: accountId
            })
            await this.handleBalanceChange(type, value, accountId)
        } catch (err) {
            throw new Error("")
        }
    }

    // TODO: create all cases
    private async handleBalanceChange(type: TransitionType, value: number, accountId: string) {
        try {
            switch(type) {
                case TransitionType.DEPOSIT:
                    await connection.raw(`
                        UPDATE accounts 
                        SET balance = balance + ${value} 
                        WHERE id = '${accountId}'
                    `)
                    break
                default: 
                    break
            }
        } catch (err) {
            throw new Error("")
        }
    } 

}