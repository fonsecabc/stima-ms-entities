export class RouteNotFoundError extends Error {
    constructor() {
        super('Route not found!!')
        this.name = 'RouteNotFoundError'
    }
}
