import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { UpdateEvaluationUsecase } from '@/domain/usecases'
import { NotFoundError, CouldNotError } from '@/domain/errors'

export class UpdateEvaluationService implements UpdateEvaluationUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract
  ) { }

  async perform({ uid, attrs }: UpdateEvaluationUsecase.Params): Promise<UpdateEvaluationUsecase.Response> {
    const evaluation = await this.evaluationRepository.get({ uid })
    if (!evaluation) return new NotFoundError('Evaluation')

    const isUpdated = await this.evaluationRepository.update({ uid, attrs })
    if (!isUpdated) return new CouldNotError('Evaluation')

    return true
  }
}
