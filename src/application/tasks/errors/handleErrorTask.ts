import { HandleErrorTreaty } from '@/application/tasks'
import { ErrorMap } from '@/domain/entities'

import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function handleErrorTask({ err, req }: HandleErrorTreaty.Params): Promise<HandleErrorTreaty.Response> {
  const error = ErrorMap.get(err.message)

  if (error) return error

  await notion.pages.create({
    parent: {
      page_id: 'd107c9402c9c408c804cab1da236a2f8',
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
                content: `Created At: ${new Date()}`,
              },
            },
          ],
          
        },
      },
    ]
  })

  return error || err
}
