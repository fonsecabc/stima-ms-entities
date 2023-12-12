import { CryptoAdapterContract } from '@/application/contracts/adapters'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'
import { DatabaseTransactionsManagerContract } from '@/application/contracts/database'
import {
  UpdateClientUsecase,
  CreateClientUsecase,
  CreateEvaluationUsecase,
} from '@/domain/usecases'
import { CouldNotError } from '@/domain/errors'
import { NutritionalRoutineStatus } from '@/domain/enums'

export class CreateEvaluationService implements CreateEvaluationUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
    private readonly updateClientService: UpdateClientUsecase,
    private readonly cryptoAdapter: CryptoAdapterContract,
    private readonly createClientService: CreateClientUsecase,
    private readonly databaseTransactionsManager: DatabaseTransactionsManagerContract
  ) { }

  async perform(params: CreateEvaluationUsecase.Params): Promise<CreateEvaluationUsecase.Response> {
    const { userUid, client, ...rest } = params

    return await this.databaseTransactionsManager.transaction(async () => {
      const createdClient = await this.createClientService.perform({ userUid, ...client })
      if (createdClient instanceof Error) throw createdClient
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
      if (isClientUpdated instanceof Error) throw isClientUpdated

      const createdEvaluation = await this.evaluationRepository.create({
        ...rest,
        uid,
        userUid,
        clientUid: createdClient.uid,
        weight: client.weight,
        height: client.height,
        createdAt,
        nutritionalRoutineStatus: NutritionalRoutineStatus.NOT_REQUESTED
      })
      if (!createdEvaluation) throw new CouldNotError('create evaluation')

      return createdEvaluation
    })
  }
}
