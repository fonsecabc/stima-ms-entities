import { DataTransformer } from '@/infra/transformers'

export class DataTransformerFactory {
  private static instance: DataTransformerFactory

  public static getInstance(): DataTransformerFactory {
    if (!this.instance) {
      this.instance = new DataTransformerFactory()
    }

    return this.instance
  }

  public make(): DataTransformer {
    return new DataTransformer()
  }
}
