import {
  Bioimpedance,
  Evaluation,
  Measurements,
  NutricionistForm,
  SkinFold,
} from '@/domain/entities'
import { Sex } from '@/domain/enums'

export interface CreateEvaluationUsecase {
  perform(params: CreateEvaluationUsecase.Params): Promise<CreateEvaluationUsecase.Response>
}

export namespace CreateEvaluationUsecase {
  export type Params = {
    userUid: string
    client: {
      name: string
      email: string
      phone: string
      dateOfBirth: string
      sex: Sex
      height: number
      weight: number
    }
    bioimpedance?: Bioimpedance
    measurements?: Measurements
    nutricionistForm?: NutricionistForm
    skinFold?: SkinFold
  }

  export type Response = Evaluation | Error
}
