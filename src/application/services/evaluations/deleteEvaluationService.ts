import { EvaluationRepositoryContract } from '../../contracts'
import { DeleteEvaluationUsecase } from '../../../domain/usecases'

export class DeleteEvaluationService implements DeleteEvaluationUsecase {
  constructor(
        private readonly evaluationRepository: EvaluationRepositoryContract,
  ) { }

  async perform({ uid }: DeleteEvaluationUsecase.Params): Promise<DeleteEvaluationUsecase.Response> {
    return await this.evaluationRepository.delete({ uid })
  }
}
