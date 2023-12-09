import {
  Client,
  ClientListObject,
  Filters,
  PaginationFilters,
} from '@/domain/entities'
import { Sex } from '@/domain/enums'
export interface ClientRepositoryContract {
  create(params: ClientRepositoryContract.Create.Params): Promise<ClientRepositoryContract.Create.Response>
  get(params: ClientRepositoryContract.Get.Params): Promise<ClientRepositoryContract.Get.Response>
  getList(params: ClientRepositoryContract.GetList.Params): Promise<ClientRepositoryContract.GetList.Response>
  update(params: ClientRepositoryContract.Update.Params): Promise<ClientRepositoryContract.Update.Response>
  delete(params: ClientRepositoryContract.Delete.Params): Promise<ClientRepositoryContract.Delete.Response>
}

export namespace ClientRepositoryContract {
  export namespace Create {
    export type Params = {
      uid: string
      userUid: string
      name: string
      email: string
      phone: string
      dateOfBirth: string
      sex: Sex
      height: number
      weight: number
      createdAt: Date
    }

    export type Response = Client
  }

  export namespace Get {
    export type Params = {
      uid: string
    }

    export type Response = Client | undefined
  }

  export namespace GetList {
    export type Params = {
      userUid: string
      filters: Filters
      paginationFilters: PaginationFilters
    }

    export type Response = ClientListObject[]
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
      uid: string
    }

    export type Response = true
  }
}
