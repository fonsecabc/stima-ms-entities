import { ClientListAgreement, DataAgreement } from '@/infra/transformers'

export class ClientListTransformer implements ClientListAgreement {
  constructor(
    private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: ClientListAgreement.Params): ClientListAgreement.Response {
    const { name, lastEvaluatedAt, createdAt, ...rest } = params

    return {
      ...rest,
      name: this.dataTransformer.firstLetterUpperCaseStringTransform(name),
      lastEvaluatedAt: this.dataTransformer.timestampToDateTransform(lastEvaluatedAt),
      createdAt: this.dataTransformer.timestampToDateTransform(createdAt),
    }
  }
}
