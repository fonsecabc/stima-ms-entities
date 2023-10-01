import { ClientRepositoryContract } from '@/application/contracts/repositories'
import { UpdateClientUsecase } from '@/domain/usecases'
import { CouldNotError, NotFoundError } from '@/domain/errors'

export class UpdateClientService implements UpdateClientUsecase {
  constructor(
    private readonly clientRepository: ClientRepositoryContract
  ) { }

  async perform({ uid, attrs }: UpdateClientUsecase.Params): Promise<UpdateClientUsecase.Response> {
    const client = await this.clientRepository.get({ uid })
    if (!client) return new NotFoundError('Client')

    const isUpdated = await this.clientRepository.update({ uid, attrs })
    if (!isUpdated) return new CouldNotError('Client')

    return true
  }
}
