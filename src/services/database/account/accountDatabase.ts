import { Service } from "typedi";
import { v4 } from "uuid";
import { TransitionType } from "../../../entities/abstractEntities/genericBankTransition";
import { AccountAction } from "../../../entities/accountAction";
import { BankTransaction } from "../../../entities/bankTransaction";
import { Payment } from "../../../entities/payment";
import { mapDateToSqlDate } from "../../../utils/mapDateToSqlDate";
import { CommonDatabase } from "../common/database";
import { BalanceDirectionType } from "../user/interface/BankStatementItemDTO";

@Service()
export class AccountDatabase extends CommonDatabase {


    async create(userId: string): Promise<void> {
        try {
            const accountId = v4()
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
            type === TransitionType.DRAFT && await this.checkBalanceEnough(accountId, value)
            const balance_direction = type === TransitionType.DEPOSIT 
                ? BalanceDirectionType.INCOMING 
                : BalanceDirectionType.EXIT
            
            await this.insert("drafts_and_deposits", {
                id,
                value, 
                type, 
                date: mapDateToSqlDate(date), 
                balance_direction,
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
            await this.checkBalanceEnough(accountId, value)
            mapDateToSqlDate(date)
            // TODO: FIX => the database is saving datetime with 3 hours more than Brazil time
            await this.insert("payments", {
                id, 
                value, 
                date: mapDateToSqlDate(date), 
                description, 
                is_a_schedule: isASchedule, 
                type, 
                balance_direction: BalanceDirectionType.EXIT,
                payment_type: paymentType, 
                account_id: accountId
            })
            if (!isASchedule) await this.handleBalanceChange(type, value, accountId)
        } catch (err) {
            throw new Error("")
        }
    }

    async handleInternalTransaction(transaction: BankTransaction): Promise<void> {
        try {
            const { 
                id, 
                value, 
                date, 
                description, 
                type, 
                accountId, 
                targetAccountId
            } = transaction
            await this.checkBalanceEnough(accountId, value)
            await this.insert("internal_transactions", {
                id: v4(), 
                value,
                date, 
                description,
                type,
                balance_direction: BalanceDirectionType.INCOMING,
                account_id: targetAccountId
            })
            await this.insert("internal_transactions", {
                id, 
                value,
                date, 
                description,
                type,
                balance_direction: BalanceDirectionType.EXIT,
                account_id: accountId
            })
            await this.handleBalanceChange(type, value, targetAccountId, BalanceDirectionType.INCOMING)
            await this.handleBalanceChange(type, value, accountId, BalanceDirectionType.EXIT)
        } catch(err) {
            throw new Error("")
        } 
    }

    private async handleBalanceChange(type: TransitionType, value: number, accountId: string, balanceDirection?: BalanceDirectionType): Promise<void> {
        try {
            switch(type) {
                case TransitionType.DEPOSIT:
                    await this.handleBalanceIncoming(accountId, value)
                    break
                case TransitionType.DRAFT:
                    await this.handleBalanceExit(accountId, value)
                    break
                case TransitionType.PAYMENT:
                    await this.handleBalanceExit(accountId, value)
                case TransitionType.INTERNAL_TRANSACTION:
                    balanceDirection === BalanceDirectionType.INCOMING 
                        ? await this.handleBalanceIncoming(accountId, value)
                        : await this.handleBalanceExit(accountId, value)
                    break
                default: 
                    break
            }
        } catch (err) {
            throw new Error("")
        }
    }
    
    private async handleBalanceIncoming(accountId: string, value: number): Promise<void> {
        try {
            await this.connection.raw(`
                UPDATE accounts 
                SET balance = balance + ${value} 
                WHERE id = '${accountId}'
            `)
        } catch (e) {
            throw new Error("")
        }
    }

    private async handleBalanceExit(accountId: string, value: number): Promise<void> {
        try {
            await this.connection.raw(`
                UPDATE accounts 
                SET balance = balance - ${value} 
                WHERE id = '${accountId}'
            `)
        } catch (e) {
            throw new Error("")
        }
    }

    private async checkBalanceEnough(accountId: string, value: number): Promise<void> {
        try {
            const result = await this.connection("accounts").select("balance").where("id", accountId)
            const balance = result[0]?.balance
            if (balance < value) throw new Error("Account without enough money.")
        } catch (e) {
            throw new Error("")
        }
    }

}