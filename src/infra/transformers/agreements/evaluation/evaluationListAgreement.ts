import { EvaluationListObject } from '@/domain/entities'

export interface EvaluationListAgreement {
  transform: (params: EvaluationListAgreement.Params) => EvaluationListAgreement.Response
}

export namespace EvaluationListAgreement {
  export type Params = {
    uid: string
    user_uid: string
    client_uid: string
    client_name: string
    nutritional_routine_status: string
    nutritional_routine_link: string | null
    created_at: string
    deleted_at: string | null
  }

  export type Response = EvaluationListObject
}
