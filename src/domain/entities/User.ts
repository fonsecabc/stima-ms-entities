import { Subscription } from './Subscription'

export interface User {
    uid: string
    email: string
    customerUid: string
    subscription?: Subscription
    hashedPassword?: string
    createdAt: Date
    deletedAt?: Date
}
