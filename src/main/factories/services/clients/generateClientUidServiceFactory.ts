import { GenerateClientUidService } from '../../../../application/services'

export class GenerateClientUidServiceFactory {
  private static instance: GenerateClientUidServiceFactory

  public static getInstance(): GenerateClientUidServiceFactory {
    if (!this.instance) {
      this.instance = new GenerateClientUidServiceFactory()
    }

    return this.instance
  }

  public make(): GenerateClientUidService {
    return new GenerateClientUidService()
  }
}
