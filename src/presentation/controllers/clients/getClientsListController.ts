import { HttpResponse, invalidParams, success } from '@/presentation/helpers'
import { InvalidParamError } from '@/domain/errors'
import { ClientListObject, Filters, PaginationFilters } from '@/domain/entities'
import { GetClientsListServiceFactory } from '@/main/factories/services'
import { GetClientsListValidatorFactory } from '@/main/factories/validators'

type Request = {
  userUid: string
  paginationFilters?: PaginationFilters
  filters?: Filters
}

export async function getClientsListController(request: Request): Promise<HttpResponse<ClientListObject[] | Error>> {
  const isValid = await GetClientsListValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const clients = await GetClientsListServiceFactory.getInstance().make().perform(request)

  return success(clients)
}
