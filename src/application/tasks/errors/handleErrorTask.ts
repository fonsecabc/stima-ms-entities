import { HandleErrorTreaty } from '@/application/tasks'
import { ErrorMap } from '@/domain/entities'

export async function handleErrorTask({ err }: HandleErrorTreaty.Params): Promise<HandleErrorTreaty.Response> {
  const error = ErrorMap.get(err.message)

  if (error) return error

  console.log('error:'+ err.message)
  return error || err
}
