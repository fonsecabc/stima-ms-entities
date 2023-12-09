import { variables } from '@/main/config'
import { DatabaseConnection, SqliteClientConnection } from '@/infra/database/connections'

export const databaseConnections: {
  sqlite: DatabaseConnection
} = {
  sqlite: new SqliteClientConnection(
    variables.databaseUrl,
    variables.databaseAuthToken
  ),
}

export const connectDatabases = async (): Promise<void> => {
  for (const connection of Object.values(databaseConnections)) {
    await connection.connect()
  }
}
