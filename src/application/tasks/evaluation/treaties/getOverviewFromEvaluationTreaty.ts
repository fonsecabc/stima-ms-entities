import { Evaluation } from '@/domain/entities'
import { GetClientsEvaluationHistoryUsecase } from '@/domain/usecases/clients/getClientsEvaluationHistoryUsecase'

export interface GetOverviewFromEvaluationTreaty {
  perform(params: GetOverviewFromEvaluationTreaty.Params): Promise<GetOverviewFromEvaluationTreaty.Response>
}

export namespace GetOverviewFromEvaluationTreaty {
  export type Params = {
    evaluationsEntitiesList: Evaluation[]
  }

  export type History = {
    weight: GetClientsEvaluationHistoryUsecase.HistoryObject[]
    fatPercentage: GetClientsEvaluationHistoryUsecase.HistoryObject[]
    muscleMassPercentage: GetClientsEvaluationHistoryUsecase.HistoryObject[]
    basalMetabolicRate: GetClientsEvaluationHistoryUsecase.HistoryObject[]
    metabolicAge: GetClientsEvaluationHistoryUsecase.HistoryObject[]
    visceralFat: GetClientsEvaluationHistoryUsecase.HistoryObject[]
  }

  export type Response = {
    overallResults: {
      weight: number
      fatPercentage: number
      muscleMassPercentage: number
      visceralFat: number
    }
    history: History
  } | undefined
}
