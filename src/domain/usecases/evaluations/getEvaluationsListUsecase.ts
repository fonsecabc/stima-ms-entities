import {
  Filters,
  EvaluationListObject,
  PaginationFilters,
} from '@/domain/entities'

export interface GetEvaluationsListUsecase {
  perform(params: GetEvaluationsListUsecase.Params): Promise<GetEvaluationsListUsecase.Response>
}

export namespace GetEvaluationsListUsecase {
  export type Params = {
    userUid: string
    paginationFilters?: PaginationFilters
    filters?: Filters
  }

  export type Response = EvaluationListObject[] | Error
}
