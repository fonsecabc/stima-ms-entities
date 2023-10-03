import { VerifyAccessTokenTreaty } from '@/application/tasks'
import { JwtAdapterContract } from '@/application/contracts/adapters'
import { User } from '@/domain/entities'
import { InvalidParamError } from '@/domain/errors'

export class VerifyAccessTokenTask implements VerifyAccessTokenTreaty {
  constructor(
    private readonly jwtAdapter: JwtAdapterContract
  ) { }

  async perform({ accessToken }: VerifyAccessTokenTreaty.Params): Promise<VerifyAccessTokenTreaty.Response> {
    let decryptToken = await this.jwtAdapter.verify(accessToken)
    if (!decryptToken) return new InvalidParamError('accessToken')

    decryptToken = (typeof decryptToken === 'string') ? JSON.parse(decryptToken) : decryptToken
    return decryptToken as User
  }
}
