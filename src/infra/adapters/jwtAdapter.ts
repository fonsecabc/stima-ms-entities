import { JwtAdapterContract } from '@/application/contracts/adapters'

import { SignOptions, sign, verify, JwtPayload } from 'jsonwebtoken'


export class JwtAdapter implements JwtAdapterContract {
  constructor(
    private readonly secret: string,
  ) {}

  async sign(payload: any): Promise<string> {
    const options = this.prepareSignOptions(payload.uid as string)

    return sign(payload, this.secret, options)
  }

  async verify(token: string): Promise<JwtPayload | false> {
    try {
      return verify(token, this.secret) as JwtPayload
    } catch (error) {
      return false
    }
  }

  private prepareSignOptions(id: string): SignOptions {
    const options: SignOptions = {
      subject: id,
      algorithm: 'HS256',
    }

    return options
  }
}
