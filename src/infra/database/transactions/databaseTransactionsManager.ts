import { DatabaseConnection } from '@/infra/database/connections'
import { DatabaseTransactionsManagerContract } from '@/application/contracts/database'

export class DatabaseTransactionsManager implements DatabaseTransactionsManagerContract {
  constructor(private readonly connection: DatabaseConnection) { }

  async transaction<T>(callback: () => Promise<T>): Promise<T> {
    return await this.connection.transaction(callback)
  }
}
