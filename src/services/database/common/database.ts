import { Knex } from "knex";
import { Service } from "typedi";
import connection from "./databaseConnection";

@Service()
// @ts-ignore
export abstract class CommonDatabase {
    connection: Knex

    constructor() {
        this.connection = connection
    }

    // TODO: use this method in all insert cases
    async insert(table: string, itemToAdd: Object) {
        try {
            await this.connection(table).insert(itemToAdd)
        } catch (e) {
            throw new Error("")
        }
    }

}