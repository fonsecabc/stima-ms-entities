import { GetOverviewFromEvaluationTask } from '../../../application/services'

export class GetOverviewFromEvaluationTaskFactory {
  private static instance: GetOverviewFromEvaluationTaskFactory

  public static getInstance(): GetOverviewFromEvaluationTaskFactory {
    if (!this.instance) {
      this.instance = new GetOverviewFromEvaluationTaskFactory()
    }

    return this.instance
  }

  public make(): GetOverviewFromEvaluationTask {
    return new GetOverviewFromEvaluationTask()
  }
}
