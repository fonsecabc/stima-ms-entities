import { Client } from '@/domain/entities'

import { Timestamp } from 'firebase-admin/firestore'

export interface ClientAgreement {
  transform: (params: ClientAgreement.Params) => ClientAgreement.Response
}

export namespace ClientAgreement {
  export type Params = Client & {
    createdAt: Timestamp
    lastEvaluatedAt?: Timestamp
  }

  export type Response = Client
}
