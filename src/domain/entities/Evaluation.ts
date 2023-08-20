import { Client } from './Client'
import { NutritionalRoutineStatus } from '../enums'

export type Evaluation = {
    uid: string
    userUid: string
    client: Client
    bioimpedance: string
    measurements: string
    nutricionistForm: string
    nutritionalRoutineStatus: NutritionalRoutineStatus
    nutritionalRoutineLink?: string
    createdAt: any
    deletedAt?: any
}
