import {
  Client,
  SkinFold,
  Measurements,
  Bioimpedance,
  NutricionistForm,
} from '@/domain/entities'
import { NutritionalRoutineStatus } from '@/domain/enums'

export type Evaluation = {
  uid: string
  userUid: string
  client: Client
  bioimpedance?: Bioimpedance
  measurements?: Measurements
  nutricionistForm?: NutricionistForm
  skinFold?: SkinFold
  nutritionalRoutineStatus: NutritionalRoutineStatus
  nutritionalRoutineLink?: string
  createdAt: Date
  deletedAt?: Date
}
