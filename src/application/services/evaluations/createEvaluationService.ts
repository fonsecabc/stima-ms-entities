import {
  UpdateClientUsecase,
  CreateClientUsecase,
  CreateEvaluationUsecase,
  GenerateEvaluationUidUsecase,
} from '../../../domain/usecases'
import { EvaluationRepositoryContract } from '../../contracts'

export class CreateEvaluationService implements CreateEvaluationUsecase {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryContract,
    private readonly updateClientService: UpdateClientUsecase,
    private readonly generateUidService: GenerateEvaluationUidUsecase,
    private readonly createClientService: CreateClientUsecase
  ) { }

  async perform(params: CreateEvaluationUsecase.Params): Promise<CreateEvaluationUsecase.Response> {
    const { userUid, client, bioimpedance, measurements, nutricionistForm } = params
    const createdClient = await this.createClientService.perform({ userUid, ...client })
    const uid = await this.generateUidService.perform({ userUid, clientUid: createdClient.uid, createdAt: `${new Date()}` })

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
