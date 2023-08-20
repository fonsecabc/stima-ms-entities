import { ClientRepositoryContract } from '../../contracts'
import { DeleteClientUsecase } from '../../../domain/usecases'

export class DeleteClientService implements DeleteClientUsecase {
    constructor(
        private readonly clientRepository: ClientRepositoryContract,
    ) { }

    async perform({ uid }: DeleteClientUsecase.Params): Promise<DeleteClientUsecase.Response> {
        return await this.clientRepository.delete({ uid })
    }
}
