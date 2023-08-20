import { InvalidParamError } from '../../presentation/errors'
import { EntityAlreadyExistsError } from '../errors'

export type ErrorMap = Map<string, Error>

export const ErrorMap: ErrorMap = new Map([
    [
        'Update() requires either a single JavaScript object or an alternating list of field/value pairs that can be followed by an optional precondition. At least one field must be updated.',
        new InvalidParamError('attrs'),
    ],
    [
        'The email address is already in use by another account.',
        new EntityAlreadyExistsError('User'),
    ],
    [
        'The email address is improperly formatted.',
        new InvalidParamError('email'),
    ],
])
