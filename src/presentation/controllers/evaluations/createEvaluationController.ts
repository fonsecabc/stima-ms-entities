import { HttpResponse, badRequest, invalidParams, success } from '@/presentation/helpers'
import {
  SkinFold,
  Evaluation,
  Measurements,
  Bioimpedance,
  NutricionistForm,
} from '@/domain/entities'
import { Sex } from '@/domain/enums'
import { InvalidParamError } from '@/domain/errors'
// import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { CreateEvaluationServiceFactory } from '@/main/factories/services'
import { CreateEvaluationValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
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

export async function createEvaluationController(request: Request): Promise<HttpResponse<Evaluation | Error>> {
  const isValid = await CreateEvaluationValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  // const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  // if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const evaluation = await CreateEvaluationServiceFactory.getInstance().make().perform(request)

  return evaluation instanceof Error ? badRequest(evaluation) : success(evaluation)
}
