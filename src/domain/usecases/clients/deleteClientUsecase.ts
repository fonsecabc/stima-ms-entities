export interface DeleteClientUsecase {
  perform(params: DeleteClientUsecase.Params): Promise<DeleteClientUsecase.Response>
}
export namespace DeleteClientUsecase {
  export type Params = {
    uid: string
  }

  export type Response = true | Error
}
