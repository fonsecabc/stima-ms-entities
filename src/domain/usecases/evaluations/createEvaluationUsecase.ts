import { Sex } from '../../enums'
import { Evaluation } from '../../entities'

export interface CreateEvaluationUsecase {
    perform(params: CreateEvaluationUsecase.Params): Promise<CreateEvaluationUsecase.Response>
}

export namespace CreateEvaluationUsecase {
    export type Params = {
        userUid: string
        client: {
            name: string
            email: string
            phone: string
            dateOfBirth: string
            sex: Sex
            height: number
            weight: number
        }
        bioimpedance: object
        measurements: object
        nutricionistForm: object
    }

    export type Response = Evaluation
}
