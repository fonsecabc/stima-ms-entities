import { ClientRepositoryContract } from '@/application/contracts/repositories'
import { NotFoundError } from '@/domain/errors'
import { GetClientUsecase } from '@/domain/usecases'

export class GetClientService implements GetClientUsecase {
  constructor(
    private readonly clientRepository: ClientRepositoryContract,
  ) { }

  async perform(params: GetClientUsecase.Params): Promise<GetClientUsecase.Response> {
    const client = await this.clientRepository.get(params)

    return client ?? new NotFoundError('Client')
  }
}
