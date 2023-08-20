import { InvalidParamError } from '../../../presentation/errors'
import { VerifyAccessTokenUsecase } from '../../../domain/usecases'
import { AuthRepository } from '../../../infra/repositories'

export class VerifyAccessTokenService implements VerifyAccessTokenUsecase {
    constructor(
        private readonly authenticationRepository: AuthRepository,
    ) { }

    async perform({ accessToken }: VerifyAccessTokenUsecase.Params): Promise<VerifyAccessTokenUsecase.Response> {
        const isValid = await this.authenticationRepository.verifyToken({ accessToken })

        return isValid ? isValid : new InvalidParamError('accessToken')
    }
}
