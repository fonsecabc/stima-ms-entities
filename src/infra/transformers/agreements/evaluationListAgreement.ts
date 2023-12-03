import { EvaluationListObject } from '@/domain/entities'

import { Timestamp } from 'firebase-admin/firestore'

export interface EvaluationListAgreement {
  transform: (evaluationList: EvaluationListAgreement.Params) => EvaluationListAgreement.Response
}

export namespace EvaluationListAgreement {
  export type Params = {
    uid: string
    userUid: string
    client: {
      uid: string
      name: string
    }
    nutritionalRoutineStatus: string
    nutritionalRoutineLink: string
    createdAt: Timestamp
  }

  export type Response = EvaluationListObject
}
