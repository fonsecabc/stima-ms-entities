export interface LoggerAdapterContract {
  logError(params: LoggerAdapterContract.LogError.Params): Promise<LoggerAdapterContract.LogError.Response>
}

export namespace LoggerAdapterContract {
  export namespace LogError {
    export type Params = {
      err: Error
      req: any
    }

    export type Response = void
  }
}
