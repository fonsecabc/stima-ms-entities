import { GetClientsEvaluationHistoryService } from '@/application/services'
import { GetClientServiceFactory } from '@/main/factories/services'
import { EvaluationRepositoryFactory } from '@/main/factories/repositories'
import { GetOverviewFromEvaluationTaskFactory } from '@/main/factories/tasks'

export class GetClientsEvaluationHistoryServiceFactory {
  private static instance: GetClientsEvaluationHistoryServiceFactory

  public static getInstance(): GetClientsEvaluationHistoryServiceFactory {
    if (!this.instance) {
      this.instance = new GetClientsEvaluationHistoryServiceFactory()
    }

    return this.instance
  }

  public make(): GetClientsEvaluationHistoryService {
    return new GetClientsEvaluationHistoryService(
      EvaluationRepositoryFactory.getInstance().make(),
      GetClientServiceFactory.getInstance().make(),
      GetOverviewFromEvaluationTaskFactory.getInstance().make()
    )
  }
}
