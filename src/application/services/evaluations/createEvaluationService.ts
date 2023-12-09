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
    const { userUid, client, ...rest } = params

    const createdClient = await this.createClientService.perform({ userUid, ...client })
    if (createdClient instanceof Error) return createdClient
    const createdAt = new Date()

    const uid = await this.cryptoAdapter.hashString(userUid + createdClient.uid + createdAt)

    const isClientUpdated = await this.updateClientService.perform({
      uid: createdClient.uid,
      attrs: {
        lastEvaluatedAt: createdAt,
        email: client.email,
        height: client.height,
        weight: client.weight,
      },
    })
    if (isClientUpdated instanceof Error) return isClientUpdated

    const createdEvaluation = await this.evaluationRepository.create({
      ...rest,
      uid,
      userUid,
      clientName: client.name,
      clientUid: createdClient.uid,
      weight: client.weight,
      height: client.height,
      createdAt,
    })
    if (!createdEvaluation) return new CouldNotError('create evaluation')

    return createdEvaluation
  }
}
