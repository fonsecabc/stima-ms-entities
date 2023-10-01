import { CryptoAdapterContract } from '@/application/contracts/adapters'

import { randomUUID, createHash, timingSafeEqual } from 'crypto'

export class CryptoAdapter implements CryptoAdapterContract {
  async generateUuid(): Promise<string> {
    return randomUUID()
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await this.generateUuid()
    const hash = createHash('sha256')

    hash.update(password + salt)

    return `${hash.digest('hex')}:${salt}`
  }

  async comparePasswords(plainText: string, hashedPassword: string): Promise<boolean> {
    const [hashed, salt] = hashedPassword.split(':')
    const hash = createHash('sha256')

    hash.update(plainText + salt)
    const plainHashed = hash.digest()

    return timingSafeEqual(plainHashed, Buffer.from(hashed, 'hex'))
  }

  async hashString(str: string): Promise<string> {
    return createHash('sha256').update(str).digest('hex')
  }
}
