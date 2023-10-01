import { Subscription } from './Subscription'

export interface User {
    uid: string
    email: string
    createdAt: any
    customerUid: string
    subscription?: Subscription
    deletedAt?: any
    hashedPassword?: string
}
