import { EvaluationListAgreement, DataAgreement } from '@/infra/transformers'
import { NutritionalRoutineStatus } from '@/domain/enums'

export class EvaluationListTransformer implements EvaluationListAgreement {
  constructor(
    private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: EvaluationListAgreement.Params): EvaluationListAgreement.Response {
    return {
      ...params,
      clientName: this.dataTransformer.firstLetterUpperCaseStringTransform(params.client.name),
      clientUid: params.client.uid,
      nutritionalRoutineStatus: NutritionalRoutineStatus.fromValue(params.nutritionalRoutineStatus),
      createdAt: this.dataTransformer.timestampToDateTransform(params.createdAt),
    }
  }
}
