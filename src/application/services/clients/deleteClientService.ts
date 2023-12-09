import { DeleteClientUsecase } from '@/domain/usecases'
import { NotFoundError, CouldNotError } from '@/domain/errors'
import { ClientRepositoryContract } from '@/application/contracts/repositories'

export class DeleteClientService implements DeleteClientUsecase {
  constructor(
    private readonly clientRepository: ClientRepositoryContract,
  ) { }

  async perform({ uid }: DeleteClientUsecase.Params): Promise<DeleteClientUsecase.Response> {
    const client = await this.clientRepository.get({ uid })
    if (!client) return new NotFoundError('Client')

    const isDeleted = await this.clientRepository.delete({ uid })

    return isDeleted || new CouldNotError('delete client')
  }
}
