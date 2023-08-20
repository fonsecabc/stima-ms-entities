import { InvalidParamError } from '../../../presentation/errors'
import { ValidatorsInterface } from '../validatorsInterface'
import validator from 'validator'

export class EmailValidation implements ValidatorsInterface {
    constructor(
        private readonly paramName: string
    ) { }

    async validate(input: any): Promise<true | Error> {
        const isValid = validator.isEmail(input[this.paramName])
        if (!isValid) return new InvalidParamError('email')

        return true
    }
}
