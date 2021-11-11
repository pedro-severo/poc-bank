import { User } from "./user"
 
export class AccountAction {
    id: string
    value: number
    date: Date
    type: AccountActionType
    user!: User
    description?: string

    constructor(
        value: number,
        id: string,
        date: Date,
        type: AccountActionType,
        description?: string
    ) {
        this.id = id 
        this.value = value
        this.date = date
        this.type = type
        this.description = description
    }
}

export enum AccountActionType {
    DEPOSIT = 1,
    DRAFT = 2
}