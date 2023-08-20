import { QueryOperators } from '../enums'

export type GetQuery = {
    param: string
    operator: QueryOperators
    comparison: string
}
