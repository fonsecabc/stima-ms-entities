import { DataTransformerFactory } from '@/main/factories/transformers'
import { ClientListTransformer } from '@/infra/transformers'

export class ClientListTransformerFactory {
  private static instance: ClientListTransformerFactory

  public static getInstance(): ClientListTransformerFactory {
    if (!this.instance) {
      this.instance = new ClientListTransformerFactory()
    }

    return this.instance
  }

  public make(): ClientListTransformer {
    return new ClientListTransformer(
      DataTransformerFactory.getInstance().make()
    )
  }
}
