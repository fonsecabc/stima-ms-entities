import { HashRepositoryContract } from '../../application/contracts'
import { createHash } from 'crypto'


export class HashRepository implements HashRepositoryContract {
  constructor() { }

  async hashString(hash: HashRepositoryContract.HashString.Params): Promise<HashRepositoryContract.HashString.Response> {
    return createHash('sha256').update(hash).digest('hex')
  }
}
