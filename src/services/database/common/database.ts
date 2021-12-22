import { BankStatementItemDTO } from './../user/interface/BankStatementItemDTO';
import { Knex } from "knex";
import knex from "knex"
import { Service } from "typedi";
import dotenv from "dotenv"

dotenv.config()
@Service()
export abstract class CommonDatabase {
    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
           host: process.env.DB_HOST,
           port: 3306,
           user: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_SCHEMA,
           multipleStatements: true
        }
    })

    async insert(table: string, itemToAdd: Object) {
        try {
            await CommonDatabase.connection(table).insert(itemToAdd)
        } catch (e) {
            throw new Error("")
        }
    }

    async getBankStatement(accountId: string): Promise<BankStatementItemDTO[]> {
        try {
            const drafts_and_deposits = await CommonDatabase.connection("drafts_and_deposits")
                .select("value", "type", "date", "balance_direction", "description")
                .where("account_id", accountId)
                .orderBy("date")
            const payments = await CommonDatabase.connection("payments")
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
            const internalTransactions = await CommonDatabase.connection("internal_transactions")
                .select("value", "type", "date", "balance_direction", "description")
                .where("account_id", accountId)
                .orderBy("date")
            return [...drafts_and_deposits, ...payments, ...internalTransactions]
        } catch (e) {
            throw new Error("")
        }
    }

}