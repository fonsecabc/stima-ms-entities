import { EvaluationRepositoryFactory } from '../..'
import { UpdateEvaluationService } from '../../../../application/services'

export class UpdateEvaluationServiceFactory {
    private static instance: UpdateEvaluationServiceFactory

    public static getInstance(): UpdateEvaluationServiceFactory {
        if (!this.instance) {
            this.instance = new UpdateEvaluationServiceFactory()
        }

        return this.instance
    }

    public make(): UpdateEvaluationService {
        return new UpdateEvaluationService(
            EvaluationRepositoryFactory.getInstance().make()
        )
    }
}
