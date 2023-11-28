import './config/moduleAlias'
import { routes } from '@/main/config'
import { initializeApp } from '@/main/app'
import { eventHandler } from '@/main/adapters'
import * as fromMocks from '@/domain/mocks'

initializeApp()

const event = fromMocks.getClientsEvaluationHistoryMock as any

eventHandler(event, routes).then(console.log)
