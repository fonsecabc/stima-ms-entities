export const variables = {
  apiKey: process.env.API_KEY ?? 'undefined',
  firebaseAdminSdk: process.env.CONFIG_FIREBASE_ADMIN_SDK ?? 'undefined',
  jwtSecret: process.env.JWT_SECRET ?? 'undefined',
  notionToken: process.env.NOTION_TOKEN ?? 'undefined',
  notionPageId: process.env.NOTION_PAGE_ID ?? 'undefined',
}

export const testVariables = (): boolean => {
  return Object.values(variables).every((value) => {
    return (value !== 'undefined')
  })
}
