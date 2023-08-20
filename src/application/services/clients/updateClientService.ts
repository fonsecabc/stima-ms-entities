import { ClientRepositoryContract } from '../../contracts'
import { UpdateClientUsecase } from '../../../domain/usecases'

export class UpdateClientService implements UpdateClientUsecase {
    constructor(
        private readonly clientRepository: ClientRepositoryContract,
    ) { }

    async perform({ uid, attrs }: UpdateClientUsecase.Params): Promise<UpdateClientUsecase.Response> {
        return await this.clientRepository.update({ uid, attrs })
    }
}
