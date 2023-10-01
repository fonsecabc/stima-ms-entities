import { EvaluationRepositoryFactory } from '@/main/factories/repositories'
import { GetEvaluationService } from '@/application/services'

export class GetEvaluationServiceFactory {
  private static instance: GetEvaluationServiceFactory

  public static getInstance(): GetEvaluationServiceFactory {
    if (!this.instance) {
      this.instance = new GetEvaluationServiceFactory()
    }

    return this.instance
  }

  public make(): GetEvaluationService {
    return new GetEvaluationService(
      EvaluationRepositoryFactory.getInstance().make()
    )
  }
}
