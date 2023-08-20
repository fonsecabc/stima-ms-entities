export interface GenerateClientUidUsecase {
    generateClientUid(params: GenerateClientUidUsecase.Params): Promise<GenerateClientUidUsecase.Response>
}

export namespace GenerateClientUidUsecase {
    export type Params = {
        userUid: string
        phone: string
        dateOfBirth: string
    }
    export type Response = string
}
