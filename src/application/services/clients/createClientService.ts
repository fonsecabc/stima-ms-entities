import { CryptoAdapterContract } from '@/application/contracts/adapters'
import { ClientRepositoryContract } from '@/application/contracts/repositories'
import { CouldNotError } from '@/domain/errors'
import { CreateClientUsecase } from '@/domain/usecases'

export class CreateClientService implements CreateClientUsecase {
  constructor(
    private readonly clientRepository: ClientRepositoryContract,
    private readonly cryptoAdapter: CryptoAdapterContract
  ) { }

  async perform(params: CreateClientUsecase.Params): Promise<CreateClientUsecase.Response> {
    const { userUid, name, email = '', phone, dateOfBirth, sex, height, weight } = params

    const uid = await this.cryptoAdapter.hashString(userUid + phone + dateOfBirth)
    const client = await this.clientRepository.get({ uid })
    if (client) return client

    const createdAt = new Date()

    const createdClient = await this.clientRepository.create({ uid, userUid, name, email, phone, dateOfBirth, sex, height, weight, createdAt })

    return createdClient || new CouldNotError('create client')
  }
}
