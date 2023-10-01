import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { HttpResponse, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { UpdateEvaluationServiceFactory } from '@/main/factories/services'
import { UpdateEvaluationValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  uid: string
  attrs: object
}

export async function updateEvaluationController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await UpdateEvaluationValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const isUpdated = await UpdateEvaluationServiceFactory.getInstance().make().perform(request)
  if (!isUpdated) return notFound(new NotFoundError('evaluation'))

  return success(isUpdated)
}
