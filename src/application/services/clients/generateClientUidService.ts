import { HashRepository } from '../../../infra/repositories'
import { GenerateClientUidUsecase } from '../../../domain/usecases'

export class GenerateClientUidService implements GenerateClientUidUsecase {
    constructor(
    ) { }

    private readonly hashRepo = new HashRepository()

    async generateClientUid(params: GenerateClientUidUsecase.Params): Promise<GenerateClientUidUsecase.Response> {
        const { userUid, phone, dateOfBirth } = params

        return this.hashRepo.hashString(userUid + phone + dateOfBirth)
    }
}
