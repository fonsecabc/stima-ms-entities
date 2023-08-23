export class NotFoundError extends Error {
  constructor(name: string) {
    super(`Informed ${name} not found!!`)
    this.name = 'NotFoundError'
  }
}
