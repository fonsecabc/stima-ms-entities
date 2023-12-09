import { ClientRepository } from '@/infra/repositories'
import { ClientListTransformerFactory, ClientTransformerFactory } from '@/main/factories/transformers'
import { databaseConnections } from '@/main/config'

export class ClientRepositoryFactory {
  private static instance: ClientRepositoryFactory

  public static getInstance(): ClientRepositoryFactory {
    if (!this.instance) {
      this.instance = new ClientRepositoryFactory()
    }

    return this.instance
  }

  public make(): ClientRepository {
    return new ClientRepository(
      databaseConnections.sqlite,
      ClientListTransformerFactory.getInstance().make(),
      ClientTransformerFactory.getInstance().make()
    )
  }
}
