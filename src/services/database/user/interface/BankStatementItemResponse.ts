import { PaymentType } from "../../../../entities/payment";

export interface BankStatementItemResponse {
    value: number,
    type: BankStatementType,
    date: Date,
    description: string
    isASchedule?: boolean,
    paymentType?: PaymentType
}

export enum  BankStatementType {
    DEPOSIT = "Deposit",
    DRAFT = "Draft",
    PAYMENT = "Payment",
    INTERNAL_TRANSACTION = "Internal Transaction"

}