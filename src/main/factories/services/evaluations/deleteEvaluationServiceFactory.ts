import { EvaluationRepositoryFactory } from '../..'
import { DeleteEvaluationService } from '../../../../application/services'

export class DeleteEvaluationServiceFactory {
  private static instance: DeleteEvaluationServiceFactory

  public static getInstance(): DeleteEvaluationServiceFactory {
    if (!this.instance) {
      this.instance = new DeleteEvaluationServiceFactory()
    }

    return this.instance
  }

  public make(): DeleteEvaluationService {
    return new DeleteEvaluationService(
      EvaluationRepositoryFactory.getInstance().make()
    )
  }
}
