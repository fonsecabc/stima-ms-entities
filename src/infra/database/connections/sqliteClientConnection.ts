import { DatabaseConnection } from '@/infra/database/connections'
import { DatabaseError } from '@/application/errors'

import { createClient, Client, Config, ResultSet } from '@libsql/client'

export class SqliteClientConnection implements DatabaseConnection {
  private client: Client | undefined
  private dbConfig: Config

  constructor(
    private readonly databaseUrl: string,
    private readonly databaseAuthToken: string
  ) {
    this.dbConfig = {
      url: this.databaseUrl,
      authToken: this.databaseAuthToken,
    }
  }

  async connect(): Promise<void> {
    try {
      if (this.client?.closed || !this.client) {
        this.client = createClient(this.dbConfig)
        console.log(`[SQLITE]: Connected to ${this.databaseUrl}`)
      }
    } catch (error: any) {
      throw new DatabaseError(error.message)
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.client?.closed || !this.client) {
        throw new Error('[SQLITE]: Database not connected')
      }

      this.client.close()
      console.log(`[SQLITE]: Disconnected from ${this.databaseUrl}`)
    } catch (error: any) {
      throw new DatabaseError(error.message)
    }
  }

  async execute<T>(query: string, args?: any[] | undefined): Promise<ResultSet & { rows: Array<T> }> {
    try {
      if (this.client?.closed || !this.client) {
        throw new Error('[SQLITE]: Database not connected')
      }

      console.log(`[SQLITE]: ${query}`)
      console.log(`[SQLITE]: ${args}`)
      const result = await this.client.execute({
        sql: query,
        args: args ?? [],
      })

      return result as ResultSet & { rows: Array<T> }
    } catch (error: any) {
      throw new DatabaseError(error.message)
    }
  }

  async transaction<T>(callback: () => Promise<T>): Promise<T> {
    try {
      if (this.client?.closed || !this.client) {
        throw new Error('[SQLITE]: Database not connected')
      }

      const transaction = await this.client.transaction()

      try {
        console.log('[SQLITE]: Transaction started')
        const result = await callback()
        await transaction.commit()

        console.log('[SQLITE]: Transaction commited')
        return result
      } catch (error: any) {
        await transaction.rollback()
        console.log('[SQLITE]: Transaction rolled back')
        throw error
      }
    } catch (error: any) {
      throw new DatabaseError(error.message)
    }
  }
}
