import dotenv  from 'dotenv';
import knex from "knex"

dotenv.config()

const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        database: process.env.DB_SCHEMA,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    }
})

export default connection