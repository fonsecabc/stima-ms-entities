export class EnvironmentVariablesError extends Error {
    constructor() {
        super('Error when loading enviroment variables!!')
        this.name = 'EnvironmentVariablesError'
    }
}
