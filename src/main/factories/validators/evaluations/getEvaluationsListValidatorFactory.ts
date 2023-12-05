import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class GetEvaluationsListValidatorFactory {
  private static instance: GetEvaluationsListValidatorFactory

  public static getInstance(): GetEvaluationsListValidatorFactory {
    if (!this.instance) {
      this.instance = new GetEvaluationsListValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['userUid']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
