import { User } from '@/domain/entities'
import { InvalidParamError } from '@/domain/errors'

export interface VerifyAccessTokenTreaty {
  perform(params: VerifyAccessTokenTreaty.Params): Promise<VerifyAccessTokenTreaty.Response>
}
export namespace VerifyAccessTokenTreaty {
  export type Params = {
    accessToken: string
  }

  export type Response = User | InvalidParamError
}
