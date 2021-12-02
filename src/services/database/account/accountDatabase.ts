import { Service } from "typedi";
import { v4 } from "uuid";
import { TransitionType } from "../../../entities/abstractEntities/genericBankTransition";
import { AccountAction } from "../../../entities/accountAction";
import { Payment } from "../../../entities/payment";
import { mapDateToSqlDate } from "../../../utils/mapDateToSqlDate";
import { CommonDatabase } from "../common/database";
import connection from "../common/databaseConnection";

// TODO: Fix ts-ignore
@Service()
// @ts-ignore
export class AccountDatabase extends CommonDatabase {


    async create(userId: string): Promise<void> {
        try {
            const accountId = v4()
            // TODO: Create a common database class with a function to insert values in tables
            await this.insert("accounts", {
                id: accountId, 
                balance: 0,
                user_id: userId
            })
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("");
        }
    }

    async handleNewAccountAction(accountAction: AccountAction): Promise<void> {
        try {            
            const { 
                id, 
                value, 
                type, 
                date, 
                accountId, 
                description 
            } = accountAction
            // TODO: check if user have money to transfer
            await this.connection("drafts_and_deposits").insert({
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

    async handlePayment(payment: Payment): Promise<void> {
        try {
            const { 
                id, 
                value, 
                date, 
                description, 
                isASchedule, 
                type, 
                paymentType, 
                accountId 
            } = payment
            // TODO: check if user have money to pay
            await this.connection("payments").insert({
                id, 
                value, 
                date: mapDateToSqlDate(date), 
                description, 
                is_a_schedule: isASchedule, 
                type, 
                payment_type: paymentType, 
                account_id: accountId
            })
            if (!isASchedule) await this.handleBalanceChange(type, value, accountId)
        } catch (err) {
            throw new Error("")
        }
    }

    // TODO: create all cases
    private async handleBalanceChange(type: TransitionType, value: number, accountId: string): Promise<void> {
        try {
            switch(type) {
                case TransitionType.DEPOSIT:
                    await this.handleBalanceIncrement(accountId, value)
                    break
                case TransitionType.DRAFT:
                    await this.handleBalanceDecrement(accountId, value)
                    break
                case TransitionType.PAYMENT:
                    await this.handleBalanceDecrement(accountId, value)
                default: 
                    break
            }
        } catch (err) {
            throw new Error("")
        }
    }
    
    private async handleBalanceIncrement(accountId: string, value: number): Promise<void> {
        await this.connection.raw(`
            UPDATE accounts 
            SET balance = balance + ${value} 
            WHERE id = '${accountId}'
        `)
    }

    private async handleBalanceDecrement(accountId: string, value: number): Promise<void> {
        await this.connection.raw(`
            UPDATE accounts 
            SET balance = balance - ${value} 
            WHERE id = '${accountId}'
        `)
    }

}