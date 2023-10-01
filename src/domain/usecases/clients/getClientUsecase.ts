import { GetType } from '@/domain/enums'
import { Client, ClientListObject, GetQuery } from '@/domain/entities'

export interface GetClientUsecase {
    perform(params: GetClientUsecase.Params): Promise<GetClientUsecase.Response>
}
export namespace GetClientUsecase {
    export type Params = {
        userUid: string
        uid?: string
        type: GetType
        query?: GetQuery
    }

    export type Response = Client | ClientListObject[] | Error
}
