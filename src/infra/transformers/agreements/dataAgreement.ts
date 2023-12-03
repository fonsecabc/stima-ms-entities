export interface DataAgreement {
  firstLetterUpperCaseStringTransform(string: string): string
  lowerCaseStringTransform(string: string): string
  timestampToDateTransform(timestamp: any): Date
}
