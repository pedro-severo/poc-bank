import { GenericBankTransition, TransitionType } from "./abstractEntities/genericBankTransition"
import { User } from "./user"

export class BankTransaction extends GenericBankTransition {
    destiny!: User
}