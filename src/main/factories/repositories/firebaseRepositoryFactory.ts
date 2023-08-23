import { FirebaseRepository } from '../../../infra/repositories'
import { variables } from '../../config'

export class FirebaseRepositoryFactory {
  private static instance: FirebaseRepositoryFactory

  public static getInstance(): FirebaseRepositoryFactory {
    if (!this.instance) {
      this.instance = new FirebaseRepositoryFactory()
    }

    return this.instance
  }

  public make(): FirebaseRepository {
    return new FirebaseRepository(
      JSON.parse(variables.firebaseAdminSdk)
    )
  }
}
