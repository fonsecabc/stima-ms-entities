import { Client, Evaluation, EvaluationListObject } from '@/domain/entities'

export interface GetClientsEvaluationHistoryUsecase {
  perform(params: GetClientsEvaluationHistoryUsecase.Params): Promise<GetClientsEvaluationHistoryUsecase.Response>
}
export namespace GetClientsEvaluationHistoryUsecase {
  export type Params = {
    uid: string
  }

  export type HistoryObject = {
    date: Date
    value: number
  }

  export type Response = {
    client: Client
    evaluationList: EvaluationListObject[]
    newestEvaluation?: Evaluation
    overallResults?: {
      weight: number
      fatPercentage: number
      muscleMassPercentage: number
      visceralFat: number
    } | undefined
    history: {
      weight: HistoryObject[]
      fatPercentage: HistoryObject[]
      muscleMassPercentage: HistoryObject[]
      basalMetabolicRate: HistoryObject[]
      visceralFat: HistoryObject[]
      metabolicAge: HistoryObject[]
    } | undefined
  } | Error
}
