import { DatabaseTransactionsManager } from '@/infra/database/transactions'
import { databaseConnections } from '@/main/config'

export class SqliteDatabaseTransactionsManagerFactory {
  private static instance: SqliteDatabaseTransactionsManagerFactory

  public static getInstance(): SqliteDatabaseTransactionsManagerFactory {
    if (!this.instance) {
      this.instance = new SqliteDatabaseTransactionsManagerFactory()
    }

    return this.instance
  }

  public make(): DatabaseTransactionsManager {
    return new DatabaseTransactionsManager(
      databaseConnections.sqlite
    )
  }
}
