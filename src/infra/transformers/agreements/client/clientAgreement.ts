import { Client } from '@/domain/entities'

export interface ClientAgreement {
  transform: (params: ClientAgreement.Params) => ClientAgreement.Response
}

export namespace ClientAgreement {
  export type Params = {
    uid: string
    user_uid: string
    name: string
    email: string
    phone: string
    date_of_birth: string
    sex: string
    weight: number
    height: number
    last_evaluated_at?: string
    created_at: string
    deleted_at: string | null
  }

  export type Response = Client
}
