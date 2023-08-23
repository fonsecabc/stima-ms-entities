import {
  Client,
  Evaluation,
  EvaluationListObject,
  GetQuery,
} from '../../../domain/entities'

export interface EvaluationRepositoryContract {
    create(params: EvaluationRepositoryContract.Create.Params): Promise<EvaluationRepositoryContract.Create.Response>
    get(params: EvaluationRepositoryContract.Get.Params): Promise<EvaluationRepositoryContract.Get.Response>
    getList(params: EvaluationRepositoryContract.GetList.Params): Promise<EvaluationRepositoryContract.GetList.Response>
    getQuery(params: EvaluationRepositoryContract.GetQuery.Params): Promise<EvaluationRepositoryContract.GetQuery.Response>
    update(params: EvaluationRepositoryContract.Update.Params): Promise<EvaluationRepositoryContract.Update.Response>
    delete(params: EvaluationRepositoryContract.Delete.Params): Promise<EvaluationRepositoryContract.Delete.Response>
}

export namespace EvaluationRepositoryContract {
    export namespace Create {
        export type Params = {
            uid: string
            userUid: string
            client: Client
            bioimpedance: object
            measurements: object
            nutricionistForm: object
        }

        export type Response = Evaluation
    }

    export namespace Get {
        export type Params = {
            uid: string
        }

        export type Response = Evaluation
    }

    export namespace GetList {
        export type Params = {
            userUid: string
        }

        export type Response = EvaluationListObject[]
    }

    export namespace GetQuery {
        export type Params = {
            userUid: string
            query: GetQuery
            type?: 'list' | 'entity'
        }

        export type Response = EvaluationListObject[] | Evaluation[]
    }

    export namespace Update {
        export type Params = {
            uid: string
            attrs: object
        }

        export type Response = boolean
    }

    export namespace Delete {
        export type Params = {
            uid: string
        }

        export type Response = boolean
    }
}
