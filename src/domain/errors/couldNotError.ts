export class CouldNotError extends Error {
  constructor(action: string) {
    super(`Could not ${action}!!`)
    this.name = 'CouldNotError'
  }
}
