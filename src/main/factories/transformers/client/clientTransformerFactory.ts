// import { DataTransformerFactory } from '@/main/factories/transformers'
import { ClientTransformer } from '@/infra/transformers'

export class ClientTransformerFactory {
  private static instance: ClientTransformerFactory

  public static getInstance(): ClientTransformerFactory {
    if (!this.instance) {
      this.instance = new ClientTransformerFactory()
    }

    return this.instance
  }

  public make(): ClientTransformer {
    return new ClientTransformer(
      // DataTransformerFactory.getInstance().make()
    )
  }
}
