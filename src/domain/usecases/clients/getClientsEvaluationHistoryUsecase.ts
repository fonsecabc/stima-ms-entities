import { Client, Evaluation, EvaluationListObject } from '../../entities'

export interface GetClientsEvaluationHistoryUsecase {
    perform(params: GetClientsEvaluationHistoryUsecase.Params): Promise<GetClientsEvaluationHistoryUsecase.Response>
}
export namespace GetClientsEvaluationHistoryUsecase {
    export type Params = {
        userUid: string
        uid: string
    }

    export type HistoryObject = {
        date: string
        value: number
    }

    export type Response = {
        client: Client
        evaluationList: EvaluationListObject[]
        newestEvaluation: Evaluation
        overallResults: {
            weight: number
            fatPercentage: number
            muscleMassPercentage: number
            visceralFat: number
        }
        history: {
            weight: HistoryObject[]
            fatPercentage: HistoryObject[]
            muscleMassPercentage: HistoryObject[]
            basalMetabolicRate: HistoryObject[]
            visceralFat: HistoryObject[]
            metabolicAge: HistoryObject[]
        }

    } | Error
}
