import {
  VerifyAccessTokenServiceFactory,
  GetEvaluationValidatorFactory,
  GetEvaluationServiceFactory,
} from '../../../main/factories'
import { GetType } from '../../../domain/enums'
import { InvalidParamError } from '../../errors'
import { Evaluation, EvaluationListObject } from '../../../domain/entities'
import { HttpResponse, invalidParams, notFound, success, unathorized } from '../../helpers'
import { NotFoundError } from '../../../domain/errors'

type Request = {
    accessToken: string
    userUid: string
    type: GetType
}

export async function getEvaluationController(request: Request): Promise<HttpResponse<Evaluation | EvaluationListObject[] | Error>> {
  const isValid = await GetEvaluationValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const evaluations = await GetEvaluationServiceFactory.getInstance().make().perform(request)
  if (evaluations instanceof InvalidParamError) return invalidParams(evaluations)
  if (evaluations instanceof NotFoundError) return notFound(evaluations)

  return success(evaluations)
}
