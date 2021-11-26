export abstract class GenericBankTransition {
    id: string
    value: number
    type: TransitionType
    date: Date
    accountId: string
    description?: string


    constructor(
        value: number,
        id: string,
        date: Date,
        type: TransitionType,
        accountId: string,
        description?: string
    ) {
        this.id = id 
        this.value = value
        this.date = date
        this.type = type
        this.accountId = accountId
        this.description = description
    }
}


export enum TransitionType {
    DEPOSIT = "1",
    DRAFT = "2",
    PAYMENT = "3",
    INTERNAL_TRANSACTION = "4"
}