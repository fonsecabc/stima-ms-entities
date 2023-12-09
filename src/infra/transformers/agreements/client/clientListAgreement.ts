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
<<<<<<< HEAD
    created_at: string
=======
    created_at: string | null
>>>>>>> 1d9f6a100324ed931b615e7d11b47d6a30956cd3
  }

  export type Response = ClientListObject
}
