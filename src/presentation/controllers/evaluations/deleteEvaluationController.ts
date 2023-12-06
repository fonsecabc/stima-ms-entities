import { HttpResponse, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { NotFoundError } from '@/domain/errors'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { DeleteEvaluationServiceFactory } from '@/main/factories/services'
import { DeleteEvaluationValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  uid: string
}

export async function deleteEvaluationController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await DeleteEvaluationValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof Error) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof Error) return unathorized(isTokenValid)

  const isDeleted = await DeleteEvaluationServiceFactory.getInstance().make().perform(request)
  if (!isDeleted) return notFound(new NotFoundError('Evaluation'))

  return success(isDeleted)
}
