import { ClientRepositoryFactory } from '@/main/factories/repositories'
import { GetClientsListService } from '@/application/services'

export class GetClientsListServiceFactory {
  private static instance: GetClientsListServiceFactory

  public static getInstance(): GetClientsListServiceFactory {
    if (!this.instance) {
      this.instance = new GetClientsListServiceFactory()
    }

    return this.instance
  }

  public make(): GetClientsListService {
    return new GetClientsListService(
      ClientRepositoryFactory.getInstance().make()
    )
  }
}
