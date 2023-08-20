import { InvalidParamError } from '../../../presentation/errors'
import { ValidatorsInterface } from '../validatorsInterface'

export class ApiKeyValidation implements ValidatorsInterface {
    constructor(
        private readonly paramName: string,
        private readonly apiKey: string
    ) { }

    async validate(input: any): Promise<true | Error> {
        const isValid = input[this.paramName] === this.apiKey
        if (!input[this.paramName]|| !isValid) return new InvalidParamError('api key')

        return true
    }
}
