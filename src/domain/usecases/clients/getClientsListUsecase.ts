import { ClientListObject, PaginationFilters, Filters } from '@/domain/entities'

export interface GetClientsListUsecase {
    perform(params: GetClientsListUsecase.Params): Promise<GetClientsListUsecase.Response>
}
export namespace GetClientsListUsecase {
    export type Params = {
        userUid: string
        paginationFilters?: PaginationFilters
        filters?: Filters
    }

    export type Response = ClientListObject[] | Error
}
