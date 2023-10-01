import { HttpResponse, invalidParams, noContent, notFound, success } from '@/presentation/helpers'
import { GetClientsEvaluationHistoryUsecase } from '@/domain/usecases'
import { InvalidParamError, NoDataError, NotFoundError } from '@/domain/errors'
import { GetClientsEvaluationHistoryServiceFactory } from '@/main/factories/services'
import { GetClientsEvaluationHistoryValidatorFactory } from '@/main/factories/validators'

type Request = {
  userUid: string
  uid: string
}

export async function getClientsEvaluationHistoryController(request: Request): Promise<HttpResponse<GetClientsEvaluationHistoryUsecase.Response | Error>> {
  const isValid = await GetClientsEvaluationHistoryValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const clientsEvaluationHistory = await GetClientsEvaluationHistoryServiceFactory.getInstance().make().perform(request)
  if (clientsEvaluationHistory instanceof NoDataError) return noContent()
  if (clientsEvaluationHistory instanceof NotFoundError) return notFound(clientsEvaluationHistory)

  return success(clientsEvaluationHistory)
}
