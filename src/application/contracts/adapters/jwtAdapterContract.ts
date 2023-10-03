export interface JwtAdapterContract {
    sign(payload: any): Promise<string>
    verify(token: string): Promise<JwtPayload | false>
}

export interface JwtPayload {
    [key: string]: any
    iss?: string
    sub?: string
    aud?: string | string[]
    exp?: number
    nbf?: number
    iat?: number
    jti?: string
}
