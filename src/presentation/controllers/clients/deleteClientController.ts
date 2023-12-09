import { HttpResponse, badRequest, invalidParams, notFound, success } from '@/presentation/helpers'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
// import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { DeleteClientServiceFactory } from '@/main/factories/services'
import { DeleteClientValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  uid: string
}

export async function deleteClientController(request: Request): Promise<HttpResponse<true| Error>> {
  const isValid = await DeleteClientValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  // const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  // if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const isDeleted = await DeleteClientServiceFactory.getInstance().make().perform(request)
  if (isDeleted instanceof NotFoundError) return notFound(isDeleted)

  return isDeleted instanceof Error ?
    badRequest(isDeleted) :
    success(isDeleted)
}
