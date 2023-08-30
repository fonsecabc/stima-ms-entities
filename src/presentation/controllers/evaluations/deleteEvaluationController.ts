import {
  VerifyAccessTokenServiceFactory,
  DeleteEvaluationValidatorFactory,
  DeleteEvaluationServiceFactory,
} from '../../../main/factories'
import { NotFoundError } from '../../../domain/errors'
import { HttpResponse, invalidParams, notFound, success, unathorized } from '../../helpers'

type Request = {
    accessToken: string
    uid: string
}

export async function deleteEvaluationController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await DeleteEvaluationValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof Error) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof Error) return unathorized(isTokenValid)

  const isDeleted = await DeleteEvaluationServiceFactory.getInstance().make().perform(request)
  if (!isDeleted) return notFound(new NotFoundError('evaluation'))

  return success(isDeleted)
}
