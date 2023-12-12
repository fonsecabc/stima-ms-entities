import { CryptoAdapterFactory } from '@/main/factories/adapters'
import { EvaluationRepositoryFactory } from '@/main/factories/repositories'
import { SqliteDatabaseTransactionsManagerFactory } from '@/main/factories/transactions'
import { CreateClientServiceFactory, UpdateClientServiceFactory } from '@/main/factories/services'
import { CreateEvaluationService } from '@/application/services'

export class CreateEvaluationServiceFactory {
  private static instance: CreateEvaluationServiceFactory

  public static getInstance(): CreateEvaluationServiceFactory {
    if (!this.instance) {
      this.instance = new CreateEvaluationServiceFactory()
    }

    return this.instance
  }

  public make(): CreateEvaluationService {
    return new CreateEvaluationService(
      EvaluationRepositoryFactory.getInstance().make(),
      UpdateClientServiceFactory.getInstance().make(),
      CryptoAdapterFactory.getInstance().make(),
      CreateClientServiceFactory.getInstance().make(),
      SqliteDatabaseTransactionsManagerFactory.getInstance().make()
    )
  }
}
