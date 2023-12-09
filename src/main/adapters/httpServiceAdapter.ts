import { cors } from '@/main/config'
import { initializeApp } from '@/main/app'
import { LoggerAdapterFactory } from '@/main/factories/adapters'
import { NotFoundError, InvalidParamError } from '@/domain/errors'
import {
  HttpRequest,
  HttpResponse,
  Routes,
  badRequest,
  invalidParams,
  methodNotAllowed,
  notFound,
  undefinedRoute,
} from '@/presentation/helpers'

import { https, Request, Response, HttpsFunction } from 'firebase-functions'

export function defineHttpService(routes: Routes[]): HttpsFunction {
  return https.onRequest(
    async (req: Request, res: Response) => {
      cors(req, res, async () => {
        const response = await eventHandler(req as HttpRequest, routes)

        const isValid = !!(response.statusCode >= 200 && response.statusCode <= 299)
        const data = (isValid) ? response.data : { error: response.data.message }

        res.status(response.statusCode).send(data)
      })
    }
  )
}

export async function eventHandler(req: HttpRequest, routes: Routes[]): Promise<HttpResponse> {
  const request = req.method === 'GET' ? req.query : req.body
  const path = req.method === 'GET' ? req.path.split('?')[0] : req.path
  const route = routes.find((route) => route.path === path)

  if (!route) return undefinedRoute()
  if (route.method !== req.method) return methodNotAllowed()

  try {
    await initializeApp()
    return await route.handler(request)
  } catch (err: any) {
    await LoggerAdapterFactory.getInstance().make().logError({ req, err })

    if (err instanceof NotFoundError) return notFound(err)
    if (err instanceof InvalidParamError) return invalidParams(err)

    return badRequest(err)
  }
}
