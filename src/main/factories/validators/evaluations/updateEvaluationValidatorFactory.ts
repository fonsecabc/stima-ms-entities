import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class UpdateEvaluationValidatorFactory {
  private static instance: UpdateEvaluationValidatorFactory

  public static getInstance(): UpdateEvaluationValidatorFactory {
    if (!this.instance) {
      this.instance = new UpdateEvaluationValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['uid', 'attrs']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
