import { HttpResponse, invalidParams, success, unathorized } from '@/presentation/helpers'
import { Sex } from '@/domain/enums'
import { Client } from '@/domain/entities'
import { InvalidParamError } from '@/domain/errors'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { CreateClientServiceFactory } from '@/main/factories/services'
import { CreateClientValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  userUid: string
  name: string
  email?: string
  phone: string
  dateOfBirth: string
  sex: Sex
  height: number
  weight: number
}

export async function createClientController(request: Request): Promise<HttpResponse<Client | Error>> {
  const isValid = await CreateClientValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const client = await CreateClientServiceFactory.getInstance().make().perform(request)

  return success(client)
}
