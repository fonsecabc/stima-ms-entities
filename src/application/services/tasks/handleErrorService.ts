import { ErrorMap } from '../../../domain/entities'
import { HandleErrorUsecase } from '../../../domain/usecases'

export async function handleErrorService({ err }: HandleErrorUsecase.Params): Promise<HandleErrorUsecase.Response> {
  console.log(err.message)
  const error = ErrorMap.get(err.message)

  if (error) return error

  console.log(err)
  return error || err
}
