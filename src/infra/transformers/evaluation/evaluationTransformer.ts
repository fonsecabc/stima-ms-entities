import { EvaluationAgreement, DataAgreement } from '@/infra/transformers'
import { NutritionalRoutineStatus } from '@/domain/enums'

export class EvaluationTransformer implements EvaluationAgreement {
  constructor(
    private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: EvaluationAgreement.Params): EvaluationAgreement.Response {
    return {
      ...params,
      client: {
        ...params.client,
        email: params.client.email.toLowerCase(),
        name: this.dataTransformer.firstLetterUpperCaseStringTransform(params.client.name),
        createdAt: this.dataTransformer.timestampToDateTransform(params.client.createdAt),
        lastEvaluatedAt: params.client.lastEvaluatedAt && this.dataTransformer.timestampToDateTransform(params.client.lastEvaluatedAt),
      },
      nutritionalRoutineStatus: NutritionalRoutineStatus.fromValue(params.nutritionalRoutineStatus),
      createdAt: this.dataTransformer.timestampToDateTransform(params.createdAt)
    }
  }
}
