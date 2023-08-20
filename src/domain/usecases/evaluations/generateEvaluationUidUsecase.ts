export interface GenerateEvaluationUidUsecase {
    perform(params: GenerateEvaluationUidUsecase.Params): Promise<GenerateEvaluationUidUsecase.Response>
}

export namespace GenerateEvaluationUidUsecase {
    export type Params = {
        userUid: string
        clientUid: string
        createdAt: string
    }

    export type Response = string
}
