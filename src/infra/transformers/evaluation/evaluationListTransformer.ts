import { EvaluationListAgreement, DataAgreement } from '@/infra/transformers'
import { NutritionalRoutineStatus } from '@/domain/enums'

export class EvaluationListTransformer implements EvaluationListAgreement {
  constructor(
    private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: EvaluationListAgreement.Params): EvaluationListAgreement.Response {
    const { client, ...rest } = params
    
    return {
      ...rest,
      clientName: this.dataTransformer.firstLetterUpperCaseStringTransform(client.name),
      clientUid: client.uid,
      nutritionalRoutineStatus: NutritionalRoutineStatus.fromValue(rest.nutritionalRoutineStatus),
      createdAt: this.dataTransformer.timestampToDateTransform(rest.createdAt),
    } 
  }
}
