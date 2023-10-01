import { Sex } from '@/domain/enums'
import { Client } from '@/domain/entities'

export interface CreateClientUsecase {
    perform(params: CreateClientUsecase.Params): Promise<CreateClientUsecase.Response>
}

export namespace CreateClientUsecase {
    export type Params = {
        userUid: string
        name: string
        email?: string
        phone: string
        dateOfBirth: string
        sex: Sex
        height: number
        weight: number
    }

    export type Response = Client | Error
}
