import {
  VerifyAccessTokenServiceFactory,
  CreateEvaluationValidatorFactory,
  CreateEvaluationServiceFactory,
} from '../../../main/factories'
import { Sex } from '../../../domain/enums'
import { InvalidParamError } from '../../errors'
import { Evaluation } from '../../../domain/entities'
import { handleErrorService } from '../../../application/services'
import { HttpResponse, badRequest, invalidParams, success, unathorized } from '../../helpers'

type Request = {
    accessToken: string
    userUid: string
    client: {
        userUid: string
        name: string
        email: string
        phone: string
        dateOfBirth: string
        sex: Sex
        height: number
        weight: number
    }
    bioimpedance: object
    measurements: object
    nutricionistForm: object
}

export async function createEvaluationController(request: Request): Promise<HttpResponse<Evaluation | Error>> {
  try {
    const isValid = await CreateEvaluationValidatorFactory.getInstance().make().validate(request)
    if (isValid instanceof InvalidParamError) return invalidParams(isValid)

    const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
    if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

    const evaluation = await CreateEvaluationServiceFactory.getInstance().make().perform(request)

    return success(evaluation)
  } catch (err: any) {
    const error = await handleErrorService({ err })

    return badRequest(error)
  }
}
