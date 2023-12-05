import { EvaluationRepositoryFactory } from '@/main/factories/repositories'
import { GetEvaluationsListService } from '@/application/services'

export class GetEvaluationsListServiceFactory {
  private static instance: GetEvaluationsListServiceFactory

  public static getInstance(): GetEvaluationsListServiceFactory {
    if (!this.instance) {
      this.instance = new GetEvaluationsListServiceFactory()
    }

    return this.instance
  }

  public make(): GetEvaluationsListService {
    return new GetEvaluationsListService(
      EvaluationRepositoryFactory.getInstance().make()
    )
  }
}
