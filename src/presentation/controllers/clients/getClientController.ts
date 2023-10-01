import { GetType } from '@/domain/enums'
import { Client, ClientListObject } from '@/domain/entities'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { HttpResponse, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { GetClientServiceFactory } from '@/main/factories/services'
import { GetClientValidatorFactory } from '@/main/factories/validators'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'

type Request = {
  accessToken: string
  userUid: string
  type: GetType
}

export async function getClientController(request: Request): Promise<HttpResponse<Client | ClientListObject[] | Error>> {
  const isValid = await GetClientValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const clients = await GetClientServiceFactory.getInstance().make().perform(request)
  if (clients instanceof InvalidParamError) return invalidParams(clients)
  if (clients instanceof NotFoundError) return notFound(clients)

  return success(clients)
}
