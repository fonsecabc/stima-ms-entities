export interface DeleteEvaluationUsecase {
    perform(params: DeleteEvaluationUsecase.Params): Promise<DeleteEvaluationUsecase.Response>
}
export namespace DeleteEvaluationUsecase {
    export type Params = {
        uid: string
    }

    export type Response = true | Error
}
