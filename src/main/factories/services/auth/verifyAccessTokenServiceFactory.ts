import { AuthenticationRepositoryFactory } from '../../repositories'
import { VerifyAccessTokenService } from '../../../../application/services'

export class VerifyAccessTokenServiceFactory {
  private static instance: VerifyAccessTokenServiceFactory

  public static getInstance(): VerifyAccessTokenServiceFactory {
    if (!this.instance) {
      this.instance = new VerifyAccessTokenServiceFactory()
    }

    return this.instance
  }

  public make(): VerifyAccessTokenService {
    return new VerifyAccessTokenService(
      AuthenticationRepositoryFactory.getInstance().make()
    )
  }
}
