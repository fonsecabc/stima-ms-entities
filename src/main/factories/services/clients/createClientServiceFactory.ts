import { CreateClientService } from '../../../../application/services'
import { ClientRepositoryFactory, GenerateClientUidServiceFactory } from '../..'

export class CreateClientServiceFactory {
    private static instance: CreateClientServiceFactory

    public static getInstance(): CreateClientServiceFactory {
        if (!this.instance) {
            this.instance = new CreateClientServiceFactory()
        }

        return this.instance
    }

    public make(): CreateClientService {
        return new CreateClientService(
            ClientRepositoryFactory.getInstance().make(),
            GenerateClientUidServiceFactory.getInstance().make()
        )
    }
}
