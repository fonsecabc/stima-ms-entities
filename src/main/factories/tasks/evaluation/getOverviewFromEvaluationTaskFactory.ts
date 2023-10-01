import { GetOverviewFromEvaluationTask } from '@/application/tasks'

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
