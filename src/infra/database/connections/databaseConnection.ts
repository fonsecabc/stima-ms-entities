import { ResultSet } from '@libsql/client'

export interface DatabaseConnection {
  connect(): Promise<void>
  disconnect(): Promise<void>
  execute<T>(query: string, args?: any[]): Promise<ResultSet & { rows: Array<T> }>
  transaction<T>(callback: () => Promise<T>): Promise<T>
}
