export class FirebaseError extends Error {
  constructor(error: string) {
    super(`${error}`)
    this.name = 'FirebaseError'
  }
}
