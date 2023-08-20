import { ValidatorsInterface } from '.'

export class ValidationComposite implements ValidatorsInterface {
    constructor(
        private readonly validations: ValidatorsInterface[]
    ) { }

    async validate(input: any): Promise<true | Error> {
        for (const validation of this.validations) {
            const error = await validation.validate(input)
            if (error instanceof Error) {
                return error
            }
        }
        return true
    }
}
