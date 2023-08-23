import { AuthenticationRepositoryContract } from '../../application/contracts'
import { auth } from 'firebase-admin'

export class AuthRepository implements AuthenticationRepositoryContract {
  constructor(
        private readonly auth: auth.Auth
  ) { }

  async verifyToken(params: AuthenticationRepositoryContract.VerifyToken.Params): Promise<AuthenticationRepositoryContract.VerifyToken.Response> {
    try {
      const { accessToken } = params

      const token = await this.auth.verifyIdToken(accessToken)

      return !!token
    } catch (err: any) {
      return false
    }
  }
}
