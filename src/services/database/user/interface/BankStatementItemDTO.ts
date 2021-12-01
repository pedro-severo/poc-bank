import { TransitionType } from "../../../../entities/abstractEntities/genericBankTransition";
import { PaymentType } from "../../../../entities/payment";

export interface BankStatementItemDTO {
    value: number,
    type: TransitionType,
    date: string,
    description: string,
    is_a_schedule?: number,
    payment_type?: PaymentType
}