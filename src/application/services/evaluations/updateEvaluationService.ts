import { EvaluationRepositoryContract } from '../../contracts'
import { UpdateEvaluationUsecase } from '../../../domain/usecases'

export class UpdateEvaluationService implements UpdateEvaluationUsecase {
    constructor(
        private readonly evaluationRepository: EvaluationRepositoryContract,
    ) { }

    async perform({ uid, attrs }: UpdateEvaluationUsecase.Params): Promise<UpdateEvaluationUsecase.Response> {
        return await this.evaluationRepository.update({ uid, attrs })
    }
}
