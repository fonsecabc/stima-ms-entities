import { JwtAdapter } from '@/infra/adapters'
import { variables } from '@/main/config'

export class JwtAdapterFactory {
  private static instance: JwtAdapterFactory

  public static getInstance(): JwtAdapterFactory {
    if (!this.instance) {
      this.instance = new JwtAdapterFactory()
    }

    return this.instance
  }

  public make(): JwtAdapter {
    return new JwtAdapter(
      variables.jwtSecret,
    )
  }
}
