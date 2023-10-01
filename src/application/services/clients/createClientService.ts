import { CryptoAdapterContract } from '@/application/contracts/adapters'
import { ClientRepositoryContract } from '@/application/contracts/repositories'
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

    return client ? client : await this.clientRepository.create({ uid, userUid, name, email, phone, dateOfBirth, sex, height, weight })
  }
}
