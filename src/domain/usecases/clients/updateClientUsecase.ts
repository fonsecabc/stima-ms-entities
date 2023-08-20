export interface UpdateClientUsecase {
    perform(params: UpdateClientUsecase.Params): Promise<UpdateClientUsecase.Response>
}
export namespace UpdateClientUsecase {
    export type Params = {
        uid: string
        attrs: object
    }

    export type Response = boolean
}
