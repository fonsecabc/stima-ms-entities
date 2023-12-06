import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class GetClientsListValidatorFactory {
  private static instance: GetClientsListValidatorFactory

  public static getInstance(): GetClientsListValidatorFactory {
    if (!this.instance) {
      this.instance = new GetClientsListValidatorFactory()
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
