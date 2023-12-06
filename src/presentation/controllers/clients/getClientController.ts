import { Client } from '@/domain/entities'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { HttpResponse, invalidParams, notFound, success } from '@/presentation/helpers'
import { GetClientServiceFactory } from '@/main/factories/services'
import { GetClientValidatorFactory } from '@/main/factories/validators'

type Request = {
  uid: string
}

export async function getClientController(request: Request): Promise<HttpResponse<Client | Error>> {
  const isValid = await GetClientValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const clients = await GetClientServiceFactory.getInstance().make().perform(request)
  if (clients instanceof NotFoundError) return notFound(clients)

  return success(clients)
}
