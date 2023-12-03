import { DataTransformerFactory } from '@/main/factories/transformers'
import { EvaluationTransformer } from '@/infra/transformers'

export class EvaluationTransformerFactory {
  private static instance: EvaluationTransformerFactory

  public static getInstance(): EvaluationTransformerFactory {
    if (!this.instance) {
      this.instance = new EvaluationTransformerFactory()
    }

    return this.instance
  }

  public make(): EvaluationTransformer {
    return new EvaluationTransformer(
      DataTransformerFactory.getInstance().make()
    )
  }
}
