import {
    ValidatorsInterface,
    ValidationComposite,
    RequireParamValidation,
} from '../../../../infra/validators'

export class DeleteEvaluationValidatorFactory {
    private static instance: DeleteEvaluationValidatorFactory

    public static getInstance(): DeleteEvaluationValidatorFactory {
        if (!this.instance) {
            this.instance = new DeleteEvaluationValidatorFactory()
        }

        return this.instance
    }

    public make(): ValidationComposite {
        const validations: ValidatorsInterface[] = []
        for (const field of ['accessToken', 'uid']) {
            validations.push(new RequireParamValidation(field))
        }

        return new ValidationComposite(validations)
    }
}
