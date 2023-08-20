export interface UpdateEvaluationUsecase {
    perform(params: UpdateEvaluationUsecase.Params): Promise<UpdateEvaluationUsecase.Response>
}
export namespace UpdateEvaluationUsecase {
    export type Params = {
        uid: string
        attrs: object
    }

    export type Response = boolean
}
