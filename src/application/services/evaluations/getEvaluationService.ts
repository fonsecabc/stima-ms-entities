import { GetType } from '../../../domain/enums'
import { NotFoundError } from '../../../domain/errors'
import { GetEvaluationUsecase } from '../../../domain/usecases'
import { InvalidParamError } from '../../../presentation/errors'
import { EvaluationRepositoryContract } from '../../contracts'

export class GetEvaluationService implements GetEvaluationUsecase {
    constructor(
        private readonly evaluationRepository: EvaluationRepositoryContract,
    ) { }

    async perform({ userUid, uid = '', type, query }: GetEvaluationUsecase.Params): Promise<GetEvaluationUsecase.Response> {
        let response: GetEvaluationUsecase.Response

        switch (type) {
        case GetType.ENTITY:
            if (!uid) return new InvalidParamError('uid')

            response = await this.evaluationRepository.get({ uid })
            if (!response) return new NotFoundError('evaluation')

            break
        case GetType.LIST:
            if (!userUid) return new InvalidParamError('userUid')

            response = await this.evaluationRepository.getList({ userUid })
            break
        case GetType.QUERY:
            if (!query || !userUid) return new InvalidParamError('get query, userUid')

            response = await this.evaluationRepository.getQuery({ query, userUid }) as GetEvaluationUsecase.Response
            break
        default:
            response = new InvalidParamError('get type')
            break
        }

        return response
    }
}
