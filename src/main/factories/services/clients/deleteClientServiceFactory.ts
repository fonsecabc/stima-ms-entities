import { ClientRepositoryFactory } from '../..'
import { DeleteClientService } from '../../../../application/services'

export class DeleteClientServiceFactory {
    private static instance: DeleteClientServiceFactory

    public static getInstance(): DeleteClientServiceFactory {
        if (!this.instance) {
            this.instance = new DeleteClientServiceFactory()
        }

        return this.instance
    }

    public make(): DeleteClientService {
        return new DeleteClientService(
            ClientRepositoryFactory.getInstance().make()
        )
    }
}
