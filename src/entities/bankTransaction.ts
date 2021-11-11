import { User } from "./user"

export class BankTransaction {
    id: string
    value: number
    date: Date
    origin!: User
    destiny!: User
    description?: string

    constructor(
        value: number,
        id: string,
        date: Date,
        description?: string
    ) {
        this.id = id 
        this.value = value
        this.date = date
        this.description = description
    }
}