export const variables = {
  apiKey: process.env.API_KEY ?? 'undefined',
  jwtSecret: process.env.JWT_SECRET ?? 'undefined',
  notionToken: process.env.NOTION_TOKEN ?? 'undefined',
  notionPageId: process.env.NOTION_PAGE_ID ?? 'undefined',
  databaseUrl: process.env.DATABASE_URL ?? 'undefined',
  databaseAuthToken: process.env.DATABASE_AUTH_TOKEN ?? 'undefined',
}

export const testVariables = (): boolean => {
  return Object.values(variables).every((value) => {
    return (value !== 'undefined')
  })
}
