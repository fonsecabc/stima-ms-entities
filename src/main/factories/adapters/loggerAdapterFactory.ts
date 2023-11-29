import { variables } from '@/main/config'
import { LoggerAdapter } from '@/infra/adapters'

export class LoggerAdapterFactory {
  private static instance: LoggerAdapterFactory

  public static getInstance(): LoggerAdapterFactory {
    if (!this.instance) {
      this.instance = new LoggerAdapterFactory()
    }

    return this.instance
  }

  public make(): LoggerAdapter {
    return new LoggerAdapter(
      variables.notionToken,
      variables.notionPageId
    )
  }
}
