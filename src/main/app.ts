import { connectDatabases, testVariables } from '@/main/config'
import { EnvironmentVariablesError } from '@/presentation/errors'

export const initializeApp = async () => {
  const isEnvioromentValid = testVariables()
  if (!isEnvioromentValid) throw new EnvironmentVariablesError()

  await connectDatabases()
}
