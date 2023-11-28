import { CryptoAdapterContract } from '@/application/contracts/adapters'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import {
  UpdateClientUsecase,
  CreateClientUsecase,
  CreateEvaluationUsecase,
} from '@/domain/usecases'
import { CouldNotError } from '@/domain/errors'

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
    if (createdClient instanceof Error) return createdClient

    const uid = await this.cryptoAdapter.hashString(userUid + createdClient.uid + new Date().toString())

    const isClientUpdated = await this.updateClientService.perform({
      uid: createdClient.uid,
      attrs: {
        lastEvaluatedAt: new Date(),
        email: client.email,
        height: client.height,
        weight: client.weight,
      },
    })
    if (isClientUpdated instanceof Error) return isClientUpdated

    const updatedClient = {
      ...createdClient,
      lastEvaluatedAt: new Date(),
      email: client.email,
      height: client.height,
      weight: client.weight,
    }

    const createdEvaluation = await this.evaluationRepository.create({ uid, userUid, client: updatedClient, bioimpedance, measurements, nutricionistForm })
    if (!createdEvaluation) return new CouldNotError('create evaluation')

    return createdEvaluation
  }
}
