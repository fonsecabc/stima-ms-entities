import { ClientListObject } from '@/domain/entities'

import { Timestamp } from 'firebase-admin/firestore'

export interface ClientListAgreement {
  transform: (params: ClientListAgreement.Params) => ClientListAgreement.Response
}

export namespace ClientListAgreement {
  export type Params = {
    uid: string
    userUid: string
    name: string
    phone: string
    lastEvaluatedAt?: Timestamp
    createdAt: Timestamp
  }

  export type Response = ClientListObject
}
