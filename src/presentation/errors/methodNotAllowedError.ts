export class MethodNotAllowedError extends Error {
    constructor() {
        super('The method specified in the request is not allowed!!')
        this.name = 'MethodNotAllowedError'
    }
}
