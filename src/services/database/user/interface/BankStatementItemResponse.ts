import { PaymentType } from "../../../../entities/payment";
import { BalanceDirectionType } from "./BankStatementItemDTO";

export interface BankStatementItemResponse {
    value: number,
    type: BankStatementType,
    date: Date,
    description: string
    balanceDirection: BalanceDirectionType
    isASchedule?: boolean
    paymentType?: PaymentType
}

export enum  BankStatementType {
    DEPOSIT = "Deposit",
    DRAFT = "Draft",
    PAYMENT = "Payment",
    INTERNAL_TRANSACTION = "Internal Transaction"

}