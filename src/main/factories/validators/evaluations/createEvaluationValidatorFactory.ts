import {
    ValidatorsInterface,
    ValidationComposite,
    RequireParamValidation,
} from '../../../../infra/validators'

export class CreateEvaluationValidatorFactory {
    private static instance: CreateEvaluationValidatorFactory

    public static getInstance(): CreateEvaluationValidatorFactory {
        if (!this.instance) {
            this.instance = new CreateEvaluationValidatorFactory()
        }

        return this.instance
    }

    public make(): ValidationComposite {
        const validations: ValidatorsInterface[] = []
        for (const field of ['accessToken', 'userUid', 'client']) {
            validations.push(new RequireParamValidation(field))
        }

        return new ValidationComposite(validations)
    }
}
