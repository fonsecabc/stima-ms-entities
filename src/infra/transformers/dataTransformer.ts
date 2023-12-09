import { DataAgreement } from '@/infra/transformers'

export class DataTransformer implements DataAgreement {
  firstLetterUpperCaseStringTransform(string: string): string {
    const cleanString = string.toLocaleLowerCase()
    const capitalizedString = cleanString.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())

    return capitalizedString
  }

  lowerCaseStringTransform(string: string): string {
    const cleanString = string.toLocaleLowerCase()

    return cleanString
  }

  timestampToDateTransform(timestamp: any): Date {
    return timestamp.toDate()
  }
}
