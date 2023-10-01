import {
  UpdateClientUsecase,
  CreateClientUsecase,
  CreateEvaluationUsecase,
} from '@/domain/usecases'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { CryptoAdapterContract } from '@/application/contracts/adapters'

export class CreateEvaluationService implements CreateEvaluationUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
    private readonly updateClientService: UpdateClientUsecase,
    private readonly cryptoAdapter: CryptoAdapterContract,
    private readonly createClientService: CreateClientUsecase
  ) { }

  async perform(params: CreateEvaluationUsecase.Params): Promise<CreateEvaluationUsecase.Response> {
    const { userUid, client, bioimpedance, measurements, nutricionistForm } = params
    const createdClient = await this.createClientService.perform({ userUid, ...client })
    const uid = await this.cryptoAdapter.hashString(userUid + createdClient.uid + new Date().toString())

    await this.updateClientService.perform({
      uid: createdClient.uid,
      attrs: {
        lastEvaluatedAt: new Date(),
        email: client.email,
        height: client.height,
        weight: client.weight,
      },
    })

    const updatedClient = {
      ...createdClient,
      lastEvaluatedAt: new Date(),
      email: client.email,
      height: client.height,
      weight: client.weight,
    }

    return await this.evaluationRepository.create({ uid, userUid, client: updatedClient, bioimpedance, measurements, nutricionistForm })
  }
}
