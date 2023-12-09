import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class DeleteClientValidatorFactory {
  private static instance: DeleteClientValidatorFactory

  public static getInstance(): DeleteClientValidatorFactory {
    if (!this.instance) {
      this.instance = new DeleteClientValidatorFactory()
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
