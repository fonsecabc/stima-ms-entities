import { testVariables } from '@/main/config'
import { EnvironmentVariablesError } from '@/presentation/errors'

export const initializeApp = () => {
  const isEnvioromentValid = testVariables()
  if (!isEnvioromentValid) throw new EnvironmentVariablesError()
}
