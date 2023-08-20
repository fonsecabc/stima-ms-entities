export const variables = {
    apiKey: process.env.API_KEY ?? 'undefined',
    firebaseAdminSdk: process.env.CONFIG_FIREBASE_ADMIN_SDK ?? 'undefined',
}

export const testVariables = (): boolean => {
    return Object.values(variables).every((value) => {
        return (value !== 'undefined')
    })
}
