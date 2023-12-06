import { Routes } from '@/presentation/helpers'
import * as controllers from '@/presentation/controllers'

export const routes: Routes[] = [
  {
    path: '/client/create',
    method: 'POST',
    handler: controllers.createClientController,
  },
  {
    path: '/client/update',
    method: 'PUT',
    handler: controllers.updateClientController,
  },
  {
    path: '/client/get',
    method: 'GET',
    handler: controllers.getClientController,
  },
  {
    path: '/client/get-list',
    method: 'GET',
    handler: controllers.getClientsListController,
  },
  {
    path: '/client/get-evaluations-history',
    method: 'GET',
    handler: controllers.getClientsEvaluationHistoryController,
  },
  {
    path: '/client/delete',
    method: 'DELETE',
    handler: controllers.deleteClientController,
  },
  {
    path: '/evaluation/create',
    method: 'POST',
    handler: controllers.createEvaluationController,
  },
  {
    path: '/evaluation/update',
    method: 'PUT',
    handler: controllers.updateEvaluationController,
  },
  {
    path: '/evaluation/get',
    method: 'GET',
    handler: controllers.getEvaluationController,
  },
  {
    path: '/evaluation/get-list',
    method: 'GET',
    handler: controllers.getEvaluationsListController,
  },
  {
    path: '/evaluation/delete',
    method: 'DELETE',
    handler: controllers.deleteEvaluationController,
  },
]
