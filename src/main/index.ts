import { routes } from './config'
import { defineHttpService } from './adapters'

export const entities = defineHttpService(routes)
