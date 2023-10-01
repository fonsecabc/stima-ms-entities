import { CryptoAdapterFactory } from '@/main/factories/adapters'
import { ClientRepositoryFactory } from '@/main/factories/repositories'
import { CreateClientService } from '@/application/services'

export class CreateClientServiceFactory {
  private static instance: CreateClientServiceFactory

  public static getInstance(): CreateClientServiceFactory {
    if (!this.instance) {
      this.instance = new CreateClientServiceFactory()
    }

    return this.instance
  }

  public make(): CreateClientService {
    return new CreateClientService(
      ClientRepositoryFactory.getInstance().make(),
      CryptoAdapterFactory.getInstance().make()
    )
  }
}
