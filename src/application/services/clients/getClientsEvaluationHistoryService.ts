import { GetOverviewFromEvaluationTreaty } from '@/application/tasks'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { Evaluation, EvaluationListObject } from '@/domain/entities'
import { GetClientUsecase, GetClientsEvaluationHistoryUsecase } from '@/domain/usecases'

export class GetClientsEvaluationHistoryService implements GetClientsEvaluationHistoryUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
    private readonly getClientService: GetClientUsecase,
    private readonly getOverallResultsTask: GetOverviewFromEvaluationTreaty,
  ) { }

  async perform({ uid }: GetClientsEvaluationHistoryUsecase.Params): Promise<GetClientsEvaluationHistoryUsecase.Response> {
    const client = await this.getClientService.perform({ uid })
    if (client instanceof Error) return client

    const evaluationsEntitiesList = await this.evaluationRepository.getEntitiesByClientUid({ clientUid: client.uid })
    if (evaluationsEntitiesList instanceof Error) return evaluationsEntitiesList

    let evaluationList: EvaluationListObject[] = []
    let newestEvaluation: Evaluation | undefined = undefined
    let overallResultsAndHistory: GetOverviewFromEvaluationTreaty.Response | undefined = undefined

    if (evaluationsEntitiesList.length > 0) {
      evaluationList = evaluationsEntitiesList.map((evaluation) => {
        return {
          uid: evaluation.uid,
          userUid: evaluation.userUid,
          clientUid: evaluation.client.uid,
          clientName: evaluation.client.name,
          nutritionalRoutineStatus: evaluation.nutritionalRoutineStatus,
          nutritionalRoutineLink: evaluation.nutritionalRoutineLink,
          createdAt: evaluation.createdAt,
        }
      })

      newestEvaluation = evaluationsEntitiesList.reduce((prev, current) => {
        return prev.createdAt > current.createdAt ? prev : current
      })

      overallResultsAndHistory = await this.getOverallResultsTask.perform({ evaluationsEntitiesList })
    }

    return {
      client,
      evaluationList,
      newestEvaluation,
      overallResults: overallResultsAndHistory?.overallResults,
      history: overallResultsAndHistory?.history,
    }
  }
}
