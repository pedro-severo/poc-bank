import { GenericBankTransition, TransitionType } from "./abstractEntities/genericBankTransition";

export class Payment extends GenericBankTransition {
    paymentType: PaymentType
    isASchedule: boolean

    constructor(
        paymentType: PaymentType,
        value: number,
        id: string,
        date: Date,
        type: TransitionType,
        isASchedule: boolean,
        description?: string

    ) {
        super(value, id, date, type, description)
        this.paymentType = paymentType 
        this.isASchedule = isASchedule
    }
}

export enum PaymentType {
    PIX = "pix",
    BANK_SPLIT = "bankSplit",
    CREDIT_CARD = "creditCard",
    DEBIT_CARD = "debitCard"
}