import { cors } from '../config'
import { NotFoundError, InvalidParamError } from '@/domain/errors'
import { handleErrorTask } from '@/application/tasks'
import { HttpRequest, HttpResponse, Routes, badRequest, invalidParams, methodNotAllowed, notFound, undefinedRoute } from '@/presentation/helpers'

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
    return await route.handler(request)
  } catch (error: any) {
    const err = await handleErrorTask({ req, err: error })

    if (err instanceof NotFoundError) return notFound(err)
    if (err instanceof InvalidParamError) return invalidParams(err)

    return badRequest(err)
  }
}
