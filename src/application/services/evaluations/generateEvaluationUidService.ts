import { HashRepository } from '../../../infra/repositories'
import { GenerateEvaluationUidUsecase } from '../../../domain/usecases'

export class GenerateEvaluationUidService implements GenerateEvaluationUidUsecase {
  constructor() { }

  private readonly hashRepo = new HashRepository()

  async perform(params: GenerateEvaluationUidUsecase.Params): Promise<GenerateEvaluationUidUsecase.Response> {
    const { userUid, clientUid, createdAt } = params

    return this.hashRepo.hashString(userUid + clientUid + createdAt)
  }
}
