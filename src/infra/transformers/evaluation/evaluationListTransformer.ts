import { EvaluationListAgreement, DataTransformer } from '@/infra/transformers'
import { NutritionalRoutineStatus } from '@/domain/enums'

export class EvaluationListTransformer implements EvaluationListAgreement {
  constructor(
    // private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: EvaluationListAgreement.Params): EvaluationListAgreement.Response {
    const dataTransformer = new DataTransformer()

    return {
      uid: params.uid,
      userUid: params.user_uid,
      clientUid: params.client_uid,
      clientName: dataTransformer.firstLetterUpperCaseStringTransform(params.client_name),
      nutritionalRoutineStatus: NutritionalRoutineStatus.fromValue(params.nutritional_routine_status),
      nutritionalRoutineLink: params.nutritional_routine_link ?? undefined,
      createdAt: new Date(params.created_at),
      deletedAt: params.deleted_at ? new Date(params.deleted_at) : undefined,
    }
  }
}
