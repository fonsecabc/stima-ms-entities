import { FirebaseRepositoryFactory } from './firebaseRepositoryFactory'
import { EvaluationRepository } from '../../../infra/repositories'

export class EvaluationRepositoryFactory {
  private static instance: EvaluationRepositoryFactory

  public static getInstance(): EvaluationRepositoryFactory {
    if (!this.instance) {
      this.instance = new EvaluationRepositoryFactory()
    }

    return this.instance
  }

  public make(): EvaluationRepository {
    return new EvaluationRepository(
      FirebaseRepositoryFactory.getInstance().make().db,
    )
  }
}
