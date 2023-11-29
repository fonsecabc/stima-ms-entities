import { LoggerAdapterContract } from '@/application/contracts/adapters'

import { Client } from '@notionhq/client'

export class LoggerAdapter implements LoggerAdapterContract {
  private notion: Client

  constructor(
    private readonly notionToken: string,
    private readonly notionPageId: string
  ) {
    this.notion = new Client({
      auth: this.notionToken,
    })
  }

  async logError({ err, req }: LoggerAdapterContract.LogError.Params): Promise<LoggerAdapterContract.LogError.Response> {
    try {
      await this.notion.pages.create({
        parent: {
          page_id: this.notionPageId,
        },
        icon: {
          type: 'emoji',
          emoji: '🚨',
        },
        properties: {
          title: {
            title: [
              {
                type: 'text',
                text: {
                  content: `Error: ${err.message}`,
                },
              },
            ],
          },
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `Path: ${JSON.stringify(req.path)}`,
                  },
                },
              ],

            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `Method: ${JSON.stringify(req.method)}`,
                  },
                },
              ],

            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `Body: ${JSON.stringify(req.body)}`,
                  },
                },
              ],

            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `Query: ${JSON.stringify(req.query)}`,
                  },
                },
              ],

            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `Created At: ${new Date()}`,
                  },
                },
              ],

            },
          },
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }
}
