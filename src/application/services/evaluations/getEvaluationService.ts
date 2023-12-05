import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { GetEvaluationUsecase } from '@/domain/usecases'
import { NotFoundError, InvalidParamError } from '@/domain/errors'

export class GetEvaluationService implements GetEvaluationUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
  ) { }

  async perform(params: GetEvaluationUsecase.Params): Promise<GetEvaluationUsecase.Response> {
    const { uid } = params

    if (!uid) return new InvalidParamError('uid')

    const response = await this.evaluationRepository.get({ uid: uid })
    if (response instanceof Error) return response

    return response ?? new NotFoundError('evaluation')
  }
}
