export interface VerifyAccessTokenUsecase {
    perform(params: VerifyAccessTokenUsecase.Params): Promise<VerifyAccessTokenUsecase.Response>
}
export namespace VerifyAccessTokenUsecase {
    export type Params = {
        accessToken: string
    }
    export type Response = true | Error
}
