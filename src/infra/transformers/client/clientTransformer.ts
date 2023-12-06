import { ClientAgreement, DataAgreement } from '@/infra/transformers'

export class ClientTransformer implements ClientAgreement {
  constructor(
    private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: ClientAgreement.Params): ClientAgreement.Response {
    const { createdAt, lastEvaluatedAt, ...rest } = params

    return {
      ...rest,
      createdAt: this.dataTransformer.timestampToDateTransform(createdAt),
      lastEvaluatedAt: this.dataTransformer.timestampToDateTransform(lastEvaluatedAt),
    }
  }
}
