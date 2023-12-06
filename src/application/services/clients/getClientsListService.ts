import { ClientRepositoryContract } from '@/application/contracts/repositories'
import { GetClientsListUsecase } from '@/domain/usecases'

export class GetClientsListService implements GetClientsListUsecase {
  constructor(
    private readonly clientRepository: ClientRepositoryContract,
  ) { }

  async perform(params: GetClientsListUsecase.Params): Promise<GetClientsListUsecase.Response> {
    const {
      userUid,
      paginationFilters = { pageSize: 15, currentPage: 1 },
      filters = { by: 'name', order: 'asc' },
    } = params

    const response = await this.clientRepository.getList({ userUid, paginationFilters, filters })

    return response
  }
}
