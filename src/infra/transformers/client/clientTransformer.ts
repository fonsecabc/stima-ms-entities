import { Sex } from '@/domain/enums'
import { ClientAgreement, DataTransformer } from '@/infra/transformers'

export class ClientTransformer implements ClientAgreement {
  constructor(
    // private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: ClientAgreement.Params): ClientAgreement.Response {
    const dataTransformer = new DataTransformer()

    return {
      uid: params.uid,
      userUid: params.user_uid,
      name: dataTransformer.firstLetterUpperCaseStringTransform(params.name),
      email: dataTransformer.lowerCaseStringTransform(params.email),
      phone: params.phone,
      dateOfBirth: params.date_of_birth,
      sex: Sex.fromValue(params.sex),
      weight: Number(params.weight),
      height: Number(params.height),
      lastEvaluatedAt: params.last_evaluated_at ? new Date(params.last_evaluated_at) : undefined,
      createdAt: new Date(params.created_at),
      deletedAt: params.deleted_at ? new Date(params.deleted_at) : undefined,
    }
  }
}
