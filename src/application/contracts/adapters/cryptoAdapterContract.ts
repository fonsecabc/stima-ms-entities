export interface CryptoAdapterContract {
    generateUuid(): Promise<string>
    hashPassword(password: string): Promise<string>
    comparePasswords(plainText: string, hashedPassword: string): Promise<boolean>
    hashString(str: string): Promise<string>
}
