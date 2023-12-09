// import { DataTransformerFactory } from '@/main/factories/transformers'
import { EvaluationListTransformer } from '@/infra/transformers'

export class EvaluationListTransformerFactory {
  private static instance: EvaluationListTransformerFactory

  public static getInstance(): EvaluationListTransformerFactory {
    if (!this.instance) {
      this.instance = new EvaluationListTransformerFactory()
    }

    return this.instance
  }

  public make(): EvaluationListTransformer {
    return new EvaluationListTransformer(
      // DataTransformerFactory.getInstance().make()
    )
  }
}
