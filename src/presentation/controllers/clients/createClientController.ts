import {
  VerifyAccessTokenServiceFactory,
  CreateClientValidatorFactory,
  CreateClientServiceFactory,
} from '../../../main/factories'
import { Sex } from '../../../domain/enums'
import { InvalidParamError } from '../../errors'
import { Client } from '../../../domain/entities'
import { HttpResponse, invalidParams, success, unathorized } from '../../helpers'

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

  const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const client = await CreateClientServiceFactory.getInstance().make().perform(request)

  return success(client)
}
