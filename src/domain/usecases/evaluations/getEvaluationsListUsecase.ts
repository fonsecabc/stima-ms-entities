import {
  Filters,
  EvaluationListObject,
  PaginationFiltersParams,
} from '@/domain/entities'

export interface GetEvaluationsListUsecase {
  perform(params: GetEvaluationsListUsecase.Params): Promise<GetEvaluationsListUsecase.Response>
}

export namespace GetEvaluationsListUsecase {
  export type Params = {
    userUid: string
    paginationFilters?: PaginationFiltersParams
    filters?: Filters
  }

  export type Response = EvaluationListObject[] | Error
}
