import { ClientRepository } from '@/infra/repositories'
import { FirebaseRepositoryFactory } from './firebaseRepositoryFactory'

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
    )
  }
}
