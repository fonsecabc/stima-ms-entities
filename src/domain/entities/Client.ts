import { Sex } from '../enums'

export interface Client {
    uid: string
    userUid: string
    name: string
    email: string
    phone: string
    dateOfBirth: string
    sex: Sex
    weight: number
    height: number
    lastEvaluatedAt?: any
    createdAt: any
    deletedAt?: any
}
