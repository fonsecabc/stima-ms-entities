import { Evaluation } from '../../entities'
import { GetClientsEvaluationHistoryUsecase } from '../clients/getClientsEvaluationHistoryUsecase'

export interface GetOverviewFromEvaluationUsecase {
  perform(params: GetOverviewFromEvaluationUsecase.Params): Promise<GetOverviewFromEvaluationUsecase.Response>
}

export namespace GetOverviewFromEvaluationUsecase {
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
