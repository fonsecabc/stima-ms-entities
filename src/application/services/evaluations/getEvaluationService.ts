import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { NotFoundError } from '@/domain/errors'
import { GetEvaluationUsecase } from '@/domain/usecases'

export class GetEvaluationService implements GetEvaluationUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
  ) { }

  async perform(params: GetEvaluationUsecase.Params): Promise<GetEvaluationUsecase.Response> {
    const evaluation = await this.evaluationRepository.get(params)

    return evaluation ?? new NotFoundError('Evaluation')
  }
}
