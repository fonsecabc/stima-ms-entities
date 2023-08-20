import { initializeApp } from './app'
import * as controllers from '../presentation/controllers'

const event = controllers.getClientsEvaluationHistoryController

initializeApp()

const request: any = {
    userUid: 'OmAeiidI8MYvslXIe7fp8b1WT6G2',
    uid: 'bf9dc6ab213f891ba86b0fa44e5d40d2cd55c434ecacb577fa371220bdc0484e',
}

event(request).then(console.log)
