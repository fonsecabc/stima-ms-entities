import { ClientAgreement, DataAgreement } from '@/infra/transformers'

export class ClientTransformer implements ClientAgreement {
  constructor(
    private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: ClientAgreement.Params): ClientAgreement.Response {
    const { createdAt, lastEvaluatedAt, name, email, ...rest } = params

    return {
      ...rest,
      name: this.dataTransformer.firstLetterUpperCaseStringTransform(name),
      email: this.dataTransformer.lowerCaseStringTransform(email),
      createdAt: this.dataTransformer.timestampToDateTransform(createdAt),
      lastEvaluatedAt: this.dataTransformer.timestampToDateTransform(lastEvaluatedAt),
    }
  }
}
