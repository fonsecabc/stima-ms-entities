import { QueryOperators } from '@/domain/enums'

export type GetQuery = {
    param: string
    operator: QueryOperators
    comparison: string
}
