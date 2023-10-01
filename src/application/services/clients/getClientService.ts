import { GetType } from '@/domain/enums'
import { NotFoundError, InvalidParamError } from '@/domain/errors'
import { GetClientUsecase } from '@/domain/usecases'
import { ClientRepositoryContract } from '@/application/contracts/repositories'

export class GetClientService implements GetClientUsecase {
  constructor(
    private readonly clientRepository: ClientRepositoryContract,
  ) { }

  async perform({ userUid, uid, type, query }: GetClientUsecase.Params): Promise<GetClientUsecase.Response> {
    let response

    switch (type) {
    case GetType.ENTITY:
      if (!uid) return new InvalidParamError('uid')

      response = await this.clientRepository.get({ uid })
      if (!response) return new NotFoundError('client')

      break
    case GetType.LIST:
      if (!userUid) return new InvalidParamError('userUid')

      response = await this.clientRepository.getList({ userUid })
      break
    case GetType.QUERY:
      if (!query || !userUid) return new InvalidParamError('get query, userUid')

      response = await this.clientRepository.getQuery({ query, userUid })
      break
    default:
      response = new InvalidParamError('get type')
      break
    }

    return response
  }
}
