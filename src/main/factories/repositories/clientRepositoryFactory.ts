import { FirebaseRepositoryFactory } from '@/main/factories/repositories'
import { ClientRepository } from '@/infra/repositories'
import { ClientListTransformerFactory, ClientTransformerFactory } from '@/main/factories/transformers'

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
      FirebaseRepositoryFactory.getInstance().make().db,
      ClientListTransformerFactory.getInstance().make(),
      ClientTransformerFactory.getInstance().make()
    )
  }
}
