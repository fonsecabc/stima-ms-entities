export interface ValidatorsInterface {
    validate(params: any): Promise<true | Error>
}
