import { HttpResponse, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { UpdateClientServiceFactory } from '@/main/factories/services'
import { UpdateClientValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  uid: string
  attrs: object
}

export async function updateClientController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await UpdateClientValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const isUpdated = await UpdateClientServiceFactory.getInstance().make().perform(request)
  if (!isUpdated) return notFound(new NotFoundError('client'))

  return success(isUpdated)
}
