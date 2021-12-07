import { BankStatementItemDTO } from './../user/interface/BankStatementItemDTO';
import { Knex } from "knex";
import { Service } from "typedi";
import connection from "./databaseConnection";

@Service()
export abstract class CommonDatabase {
    connection: Knex

    constructor() {
        this.connection = connection
    }

    async insert(table: string, itemToAdd: Object) {
        try {
            await this.connection(table).insert(itemToAdd)
        } catch (e) {
            throw new Error("")
        }
    }

    async getBankStatement(accountId: string): Promise<BankStatementItemDTO[]> {
        try {
            const drafts_and_deposits = await this.connection("drafts_and_deposits")
                .select("value", "type", "date", "balance_direction", "description")
                .where("account_id", accountId)
                .orderBy("date")
            const payments = await this.connection("payments")
                .select(
                    "value", 
                    "type", 
                    "date", 
                    "balance_direction",
                    "description", 
                    "is_a_schedule", 
                    "payment_type"
                )
                .where("account_id", accountId)
                .orderBy("date")
            const internalTransactions = await this.connection("internal_transactions")
                .select("value", "type", "date", "balance_direction", "description")
                .where("account_id", accountId)
                .orderBy("date")
            return [...drafts_and_deposits, ...payments, ...internalTransactions]
        } catch (e) {
            throw new Error("")
        }
    }

}