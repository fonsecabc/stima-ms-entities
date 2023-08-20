export interface HashRepositoryContract {
    hashString(hash: HashRepositoryContract.HashString.Params): Promise<HashRepositoryContract.HashString.Response>
}

export namespace HashRepositoryContract {
    export namespace HashString {
        export type Params = string

        export type Response = string
    }
}
