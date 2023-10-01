import { CryptoAdapter } from '@/infra/adapters'

export class CryptoAdapterFactory {
  private static instance: CryptoAdapterFactory

  public static getInstance(): CryptoAdapterFactory {
    if (!this.instance) {
      this.instance = new CryptoAdapterFactory()
    }

    return this.instance
  }

  public make(): CryptoAdapter {
    return new CryptoAdapter()
  }
}
