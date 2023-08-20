export class NoDataError extends Error {
    constructor(name: string) {
        super(`Informed ${name} has no data!!`)
        this.name = 'NoDataError'
    }
}
