import { EvaluationListTransformerFactory, EvaluationTransformerFactory } from '@/main/factories/transformers'
import { EvaluationRepository } from '@/infra/repositories'
import { databaseConnections } from '@/main/config'

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
      databaseConnections.sqlite,
      EvaluationListTransformerFactory.getInstance().make(),
      EvaluationTransformerFactory.getInstance().make()
    )
  }
}
