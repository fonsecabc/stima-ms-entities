import { GetType } from '@/domain/enums'
import { Evaluation, EvaluationListObject, GetQuery } from '@/domain/entities'

export interface GetEvaluationUsecase {
    perform(params: GetEvaluationUsecase.Params): Promise<GetEvaluationUsecase.Response>
}
export namespace GetEvaluationUsecase {
    export type Params = {
        userUid: string
        uid?: string
        type: GetType
        query?: GetQuery
    }

    export type Response = Evaluation | EvaluationListObject[] | Error
}
