import { GenericBankTransition, TransitionType } from "./abstractEntities/genericBankTransition"

export class BankTransaction extends GenericBankTransition {
    targetAccountId: string

    constructor(
        value: number,
        id: string,
        date: Date,
        type: TransitionType,
        accountId: string,
        targetAccountId: string,
        description?: string
    ) {
        super(value, id, date, type, accountId, description)
        this.targetAccountId = targetAccountId
    }
}