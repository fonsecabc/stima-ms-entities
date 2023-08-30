import {
  VerifyAccessTokenServiceFactory,
  UpdateClientValidatorFactory,
  UpdateClientServiceFactory,
} from '../../../main/factories'
import { InvalidParamError } from '../../errors'
import { NotFoundError } from '../../../domain/errors'
import { HttpResponse, invalidParams, notFound, success, unathorized } from '../../helpers'

type Request = {
  accessToken: string
  uid: string
  attrs: object
}

export async function updateClientController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await UpdateClientValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const isUpdated = await UpdateClientServiceFactory.getInstance().make().perform(request)
  if (!isUpdated) return notFound(new NotFoundError('client'))

  return success(isUpdated)
}
