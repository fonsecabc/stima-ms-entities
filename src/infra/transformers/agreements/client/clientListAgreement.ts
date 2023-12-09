import { ClientListObject } from '@/domain/entities'

export interface ClientListAgreement {
  transform: (params: ClientListAgreement.Params) => ClientListAgreement.Response
}

export namespace ClientListAgreement {
  export type Params = {
    uid: string
    user_uid: string
    name: string
    phone: string
    last_evaluated_at: string | null
    created_at: string | null
  }

  export type Response = ClientListObject
}
