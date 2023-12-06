import {
  Client,
  SkinFold,
  Evaluation,
  Measurements,
  Bioimpedance,
  NutritionistForm,
  EvaluationListObject,
  Filters,
  PaginationFilters,
} from '@/domain/entities'

export interface EvaluationRepositoryContract {
  create(params: EvaluationRepositoryContract.Create.Params): Promise<EvaluationRepositoryContract.Create.Response>
  get(params: EvaluationRepositoryContract.Get.Params): Promise<EvaluationRepositoryContract.Get.Response>
  getList(params: EvaluationRepositoryContract.GetList.Params): Promise<EvaluationRepositoryContract.GetList.Response>
  getEntitiesByClientUid(params: EvaluationRepositoryContract.GetEntitiesByClientUid.Params): Promise<EvaluationRepositoryContract.GetEntitiesByClientUid.Response>
  update(params: EvaluationRepositoryContract.Update.Params): Promise<EvaluationRepositoryContract.Update.Response>
  delete(params: EvaluationRepositoryContract.Delete.Params): Promise<EvaluationRepositoryContract.Delete.Response>
}

export namespace EvaluationRepositoryContract {
  export namespace Create {
    export type Params = {
      uid: string
      userUid: string
      client: Client
      bioimpedance?: Bioimpedance
      measurements?: Measurements
      nutricionistForm?: NutritionistForm
      skinFold?: SkinFold
      createdAt: Date
    }

    export type Response = Evaluation
  }

  export namespace Get {
    export type Params = {
      uid: string
    }

    export type Response = Evaluation | undefined
  }

  export namespace GetList {
    export type Params = {
      userUid: string
      filters: Filters
      paginationFilters: PaginationFilters
    }

    export type Response = EvaluationListObject[]
  }

  export namespace GetEntitiesByClientUid {
    export type Params = {
      clientUid: string
    }

    export type Response = Evaluation[]
  }

  export namespace Update {
    export type Params = {
      uid: string
      attrs: object
    }

    export type Response = true
  }

  export namespace Delete {
    export type Params = {
      evaluation: Evaluation
    }

    export type Response = true
  }
}
