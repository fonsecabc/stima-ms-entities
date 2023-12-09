import { ClientListAgreement, DataTransformer } from '@/infra/transformers'

export class ClientListTransformer implements ClientListAgreement {
  constructor(
    // private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: ClientListAgreement.Params): ClientListAgreement.Response {
    const dataTransformer = new DataTransformer()

    return {
      uid: params.uid,
      userUid: params.user_uid,
      name: dataTransformer.firstLetterUpperCaseStringTransform(params.name),
      phone: params.phone,
      lastEvaluatedAt: params.last_evaluated_at ? new Date(params.last_evaluated_at) : undefined,
      createdAt: new Date(params.created_at),
    }
  }
}
