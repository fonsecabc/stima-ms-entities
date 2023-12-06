import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { GetEvaluationsListUsecase } from '@/domain/usecases'

export class GetEvaluationsListService implements GetEvaluationsListUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
  ) { }

  async perform(params: GetEvaluationsListUsecase.Params): Promise<GetEvaluationsListUsecase.Response> {
    const {
      userUid,
      paginationFilters = { pageSize: 15, currentPage: 1 },
      filters = { by: 'createdAt', order: 'asc' },
    } = params

    const response = await this.evaluationRepository.getList({ userUid, paginationFilters, filters })

    return response
  }
}
