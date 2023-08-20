export class UnknownError extends Error {
    constructor() {
        super('Unknown error happened, please try again soon!!')
        this.name = 'UnknownError'
    }
}
