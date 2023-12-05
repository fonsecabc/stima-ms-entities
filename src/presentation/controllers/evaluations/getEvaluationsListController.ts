import { HttpResponse, badRequest, invalidParams, notFound, success } from '@/presentation/helpers'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { Evaluation, EvaluationListObject, Filters, PaginationFiltersParams } from '@/domain/entities'
// import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { GetEvaluationsListServiceFactory } from '@/main/factories/services'
import { GetEvaluationsListValidatorFactory } from '@/main/factories/validators'

type Request = {
  userUid: string
  paginationFilters?: PaginationFiltersParams
  filters?: Filters
}

export async function getEvaluationsListController(request: Request): Promise<HttpResponse<Evaluation | EvaluationListObject[] | Error>> {
  const isValid = await GetEvaluationsListValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  // const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  // if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const evaluations = await GetEvaluationsListServiceFactory.getInstance().make().perform(request)
  if (evaluations instanceof InvalidParamError) return invalidParams(evaluations)
  if (evaluations instanceof NotFoundError) return notFound(evaluations)

  return evaluations instanceof Error ? badRequest(evaluations) : success(evaluations)
}
