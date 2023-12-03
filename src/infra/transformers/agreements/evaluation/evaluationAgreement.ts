import { Evaluation } from '@/domain/entities'

import { Timestamp } from 'firebase-admin/firestore'

export interface EvaluationAgreement {
  transform: (evaluation: EvaluationAgreement.Params) => EvaluationAgreement.Response
}

export namespace EvaluationAgreement {
  export type Params = Evaluation & {
    createdAt: Timestamp
  }

  export type Response = Evaluation
}
