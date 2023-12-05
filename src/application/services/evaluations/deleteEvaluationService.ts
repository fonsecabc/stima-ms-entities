import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { CouldNotError, NotFoundError } from '@/domain/errors'
import { DeleteEvaluationUsecase } from '@/domain/usecases'

export class DeleteEvaluationService implements DeleteEvaluationUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
  ) { }

  async perform({ uid }: DeleteEvaluationUsecase.Params): Promise<DeleteEvaluationUsecase.Response> {
    const evaluation = await this.evaluationRepository.get({ uid })
    if (!evaluation) return new NotFoundError('Evaluation')
    if (evaluation instanceof Error) return evaluation

    const isDeleted = await this.evaluationRepository.delete({ evaluation })

    return isDeleted || new CouldNotError('delete evaluation')
  }
}
