export interface DatabaseTransactionsManagerContract {
  transaction<T>(callback: () => Promise<T>): Promise<T>
}
