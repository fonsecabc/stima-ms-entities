import { HttpResponse, invalidParams, notFound, success } from '@/presentation/helpers'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { Evaluation } from '@/domain/entities'
// import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { GetEvaluationServiceFactory } from '@/main/factories/services'
import { GetEvaluationValidatorFactory } from '@/main/factories/validators'

type Request = {
  uid: string
}

export async function getEvaluationController(request: Request): Promise<HttpResponse<Evaluation | Error>> {
  const isValid = await GetEvaluationValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  // const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  // if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const evaluation = await GetEvaluationServiceFactory.getInstance().make().perform(request)
  if (evaluation instanceof NotFoundError) return notFound(evaluation)

  return success(evaluation)
}
