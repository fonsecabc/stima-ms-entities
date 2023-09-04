import { Client, Evaluation } from '../../../domain/entities'
import { EvaluationRepositoryContract } from '../../contracts'
import { GetType, QueryOperators } from '../../../domain/enums'
import { NoDataError, NotFoundError } from '../../../domain/errors'
import { GetClientUsecase, GetClientsEvaluationHistoryUsecase, GetOverviewFromEvaluationUsecase } from '../../../domain/usecases'

export class GetClientsEvaluationHistoryService implements GetClientsEvaluationHistoryUsecase {
  constructor(
        private readonly evaluationRepository: EvaluationRepositoryContract,
        private readonly getClientService: GetClientUsecase,
        private readonly getOverallResultsTask: GetOverviewFromEvaluationUsecase,
  ) { }

  async perform({ userUid, uid }: GetClientsEvaluationHistoryUsecase.Params): Promise<GetClientsEvaluationHistoryUsecase.Response> {
    const client = await this.getClientService.perform({
      uid,
      userUid,
      type: GetType.ENTITY,
    }) as Client

    if (client instanceof NotFoundError) return client

    const evaluationsEntitiesList = await this.evaluationRepository.getQuery({
      userUid,
      type: 'entity',
      query: {
        param: 'client.uid',
        operator: QueryOperators.EQUAL,
        comparison: uid,
      },
    }) as Evaluation[]

    if (evaluationsEntitiesList.length === 0) return new NoDataError('client')

    const newestEvaluation = evaluationsEntitiesList.reduce((prev, current) => {
      return prev.createdAt > current.createdAt ? prev : current
    })

    const evaluationList = evaluationsEntitiesList.map((evaluation) => {
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

    const overallResultsAndHistory = await this.getOverallResultsTask.perform({ evaluationsEntitiesList })

    return {
      client,
      evaluationList,
      newestEvaluation,
      overallResults: overallResultsAndHistory?.overallResults,
      history: overallResultsAndHistory?.history,
    }
  }
}
