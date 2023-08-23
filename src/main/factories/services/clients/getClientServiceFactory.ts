import { ClientRepositoryFactory } from '../..'
import { GetClientService } from '../../../../application/services'

export class GetClientServiceFactory {
  private static instance: GetClientServiceFactory

  public static getInstance(): GetClientServiceFactory {
    if (!this.instance) {
      this.instance = new GetClientServiceFactory()
    }

    return this.instance
  }

  public make(): GetClientService {
    return new GetClientService(
      ClientRepositoryFactory.getInstance().make()
    )
  }
}
