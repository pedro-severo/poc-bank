import { User } from "../user"

export abstract class GenericBankTransition {
    id: string
    value: number
    type: TransitionType
    date: Date
    description?: string
    user!: User

    constructor(
        value: number,
        id: string,
        date: Date,
        type: TransitionType,
        description?: string
    ) {
        this.id = id 
        this.value = value
        this.date = date
        this.type = type
        this.description = description
    }
}


export enum TransitionType {
    DEPOSIT = 1,
    DRAFT = 2,
    PAYMENT = 3,
    INTERNAL_TRANSACTION = 4
}