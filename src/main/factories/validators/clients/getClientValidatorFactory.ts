import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class GetClientValidatorFactory {
  private static instance: GetClientValidatorFactory

  public static getInstance(): GetClientValidatorFactory {
    if (!this.instance) {
      this.instance = new GetClientValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['uid']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
