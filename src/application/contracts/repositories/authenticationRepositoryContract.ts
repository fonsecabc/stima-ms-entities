export interface AuthenticationRepositoryContract {
    verifyToken(params: AuthenticationRepositoryContract.VerifyToken.Params): Promise<AuthenticationRepositoryContract.VerifyToken.Response>
}

export namespace AuthenticationRepositoryContract {
    export namespace VerifyToken {
        export type Params = {
            accessToken: string
        }

        export type Response = boolean
    }
}
