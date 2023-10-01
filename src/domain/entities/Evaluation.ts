import { Client } from './Client'
import { Bioimpedance } from './Bioimpedance'
import { Measurements } from './Measurements'
import { NutritionalRoutineStatus } from '@/domain/enums'
import { NutritionistForm } from './NutritionistForm'

export type Evaluation = {
    uid: string
    userUid: string
    client: Client
    bioimpedance?: Bioimpedance
    measurements?: Measurements
    nutricionistForm?: NutritionistForm
    nutritionalRoutineStatus: NutritionalRoutineStatus
    nutritionalRoutineLink?: string
    createdAt: Date
    deletedAt?: Date
}
