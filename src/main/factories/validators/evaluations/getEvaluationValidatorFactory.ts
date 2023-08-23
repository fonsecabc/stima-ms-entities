import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '../../../../infra/validators'

export class GetEvaluationValidatorFactory {
  private static instance: GetEvaluationValidatorFactory

  public static getInstance(): GetEvaluationValidatorFactory {
    if (!this.instance) {
      this.instance = new GetEvaluationValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['accessToken', 'userUid', 'type']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
