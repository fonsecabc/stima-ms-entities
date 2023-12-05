import { Evaluation } from '@/domain/entities'

export interface GetEvaluationUsecase {
  perform(params: GetEvaluationUsecase.Params): Promise<GetEvaluationUsecase.Response>
}
export namespace GetEvaluationUsecase {
  export type Params = {
    uid: string
  }

  export type Response = Evaluation | Error
}
