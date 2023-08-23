import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '../../../../infra/validators'

export class GetClientsEvaluationHistoryValidatorFactory {
  private static instance: GetClientsEvaluationHistoryValidatorFactory

  public static getInstance(): GetClientsEvaluationHistoryValidatorFactory {
    if (!this.instance) {
      this.instance = new GetClientsEvaluationHistoryValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['userUid', 'uid']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
