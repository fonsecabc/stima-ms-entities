import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class UpdateClientValidatorFactory {
  private static instance: UpdateClientValidatorFactory

  public static getInstance(): UpdateClientValidatorFactory {
    if (!this.instance) {
      this.instance = new UpdateClientValidatorFactory()
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
