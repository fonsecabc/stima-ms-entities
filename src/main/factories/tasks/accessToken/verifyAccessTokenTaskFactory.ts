import { JwtAdapterFactory } from '@/main/factories/adapters'
import { VerifyAccessTokenTask } from '@/application/tasks'

export class VerifyAccessTokenTaskFactory {
  private static instance: VerifyAccessTokenTaskFactory

  public static getInstance(): VerifyAccessTokenTaskFactory {
    if (!this.instance) {
      this.instance = new VerifyAccessTokenTaskFactory()
    }

    return this.instance
  }

  public make(): VerifyAccessTokenTask {
    return new VerifyAccessTokenTask(
      JwtAdapterFactory.getInstance().make()
    )
  }
}
