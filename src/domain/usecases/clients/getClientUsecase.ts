import { Client } from '@/domain/entities'

export interface GetClientUsecase {
	perform(params: GetClientUsecase.Params): Promise<GetClientUsecase.Response>
}
export namespace GetClientUsecase {
	export type Params = {
		uid: string
	}

	export type Response = Client | Error
}
