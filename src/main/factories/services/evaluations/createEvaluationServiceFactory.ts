import {
    UpdateClientServiceFactory,
    CreateClientServiceFactory,
    EvaluationRepositoryFactory,
    GenerateEvaluationUidServiceFactory,
} from '../..'
import { CreateEvaluationService } from '../../../../application/services'

export class CreateEvaluationServiceFactory {
    private static instance: CreateEvaluationServiceFactory

    public static getInstance(): CreateEvaluationServiceFactory {
        if (!this.instance) {
            this.instance = new CreateEvaluationServiceFactory()
        }

        return this.instance
    }

    public make(): CreateEvaluationService {
        return new CreateEvaluationService(
            EvaluationRepositoryFactory.getInstance().make(),
            UpdateClientServiceFactory.getInstance().make(),
            GenerateEvaluationUidServiceFactory.getInstance().make(),
            CreateClientServiceFactory.getInstance().make(),
        )
    }
}
