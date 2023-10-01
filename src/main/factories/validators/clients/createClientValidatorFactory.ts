import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class CreateClientValidatorFactory {
  private static instance: CreateClientValidatorFactory

  public static getInstance(): CreateClientValidatorFactory {
    if (!this.instance) {
      this.instance = new CreateClientValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['accessToken', 'userUid', 'name', 'phone', 'dateOfBirth', 'sex', 'height', 'weight']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
