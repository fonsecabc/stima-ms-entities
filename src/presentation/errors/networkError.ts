export class NetworkError extends Error {
    constructor() {
        super('No connection!!')
        this.name = 'NetworkError'
    }
}
