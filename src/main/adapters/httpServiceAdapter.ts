import { cors } from '../config'
import { Routes, methodNotAllowed, undefinedRoute } from '../../presentation/helpers'

import { https, Request, Response, HttpsFunction } from 'firebase-functions'

export function defineHttpService(routes: Routes[]): HttpsFunction {
    return https.onRequest(
        async (req: Request, res: Response) => {
            cors(req, res, async () => {
                const getResponse = async () => {
                    const request = req.method === 'GET' ? req.query : req.body
                    const route = routes.find((route) => route.path === req.url.split('?')[0])

                    if (!route) return undefinedRoute()
                    if (route.method !== req.method) return methodNotAllowed()

                    return await route.handler(request)
                }

                const response = await getResponse()

                const isValid = !!(response.statusCode >= 200 && response.statusCode <= 299)
                const data = (isValid) ? response.data : { error: response.data.message }

                res.status(response.statusCode).send(data)
            })
        }
    )
}
