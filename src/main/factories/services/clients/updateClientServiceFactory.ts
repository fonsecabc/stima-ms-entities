import { ClientRepositoryFactory } from '../../repositories'
import { UpdateClientService } from '../../../../application/services'

export class UpdateClientServiceFactory {
  private static instance: UpdateClientServiceFactory

  public static getInstance(): UpdateClientServiceFactory {
    if (!this.instance) {
      this.instance = new UpdateClientServiceFactory()
    }

    return this.instance
  }

  public make(): UpdateClientService {
    return new UpdateClientService(
      ClientRepositoryFactory.getInstance().make()
    )
  }
}
