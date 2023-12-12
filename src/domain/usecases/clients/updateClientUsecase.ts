export interface UpdateClientUsecase {
	perform(params: UpdateClientUsecase.Params): Promise<UpdateClientUsecase.Response>
}
export namespace UpdateClientUsecase {
	export type Params = {
		uid: string
		attrs: {
			email?: string
			name?: string
			weight?: number
			height?: number
			lastEvaluatedAt?: Date
		}
	}

	export type Response = true | Error
}
