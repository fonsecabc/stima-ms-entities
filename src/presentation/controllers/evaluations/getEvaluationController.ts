import { HttpResponse, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { GetType } from '@/domain/enums'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { Evaluation, EvaluationListObject } from '@/domain/entities'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { GetEvaluationServiceFactory } from '@/main/factories/services'
import { GetEvaluationValidatorFactory } from '@/main/factories/validators'


type Request = {
  accessToken: string
  userUid: string
  type: GetType
}

export async function getEvaluationController(request: Request): Promise<HttpResponse<Evaluation | EvaluationListObject[] | Error>> {
  const isValid = await GetEvaluationValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const evaluations = await GetEvaluationServiceFactory.getInstance().make().perform(request)
  if (evaluations instanceof InvalidParamError) return invalidParams(evaluations)
  if (evaluations instanceof NotFoundError) return notFound(evaluations)

  return success(evaluations)
}
