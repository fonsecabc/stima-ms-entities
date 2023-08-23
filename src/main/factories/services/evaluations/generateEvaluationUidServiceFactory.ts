import { GenerateEvaluationUidService } from '../../../../application/services'

export class GenerateEvaluationUidServiceFactory {
  private static instance: GenerateEvaluationUidServiceFactory

  public static getInstance(): GenerateEvaluationUidServiceFactory {
    if (!this.instance) {
      this.instance = new GenerateEvaluationUidServiceFactory()
    }

    return this.instance
  }

  public make(): GenerateEvaluationUidService {
    return new GenerateEvaluationUidService()
  }
}
