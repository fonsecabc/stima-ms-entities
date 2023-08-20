import { NutritionalRoutineStatus } from '../enums'

export interface EvaluationListObject {
    uid: string
    userUid: string
    clientUid: string
    clientName: string
    nutritionalRoutineStatus: NutritionalRoutineStatus
    nutritionalRoutineLink?: string
    createdAt: any
}
