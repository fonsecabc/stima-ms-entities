import { MethodNotAllowedError, RouteNotFoundError, UnknownError } from '../errors'

export type HttpMethods = 'POST' | 'GET' | 'PUT' | 'DELETE'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export type HttpRequest<T = any> = {
  body?: T
  query?: T
  method: HttpMethods
  path: string
}

export type Routes = {
  path: string
  method: HttpMethods
  handler: (request: any) => Promise<HttpResponse>
}

export function success<T = any>(data: T): HttpResponse<T> {
  return {
    statusCode: 200,
    data,
  }
}

export function noContent(): HttpResponse {
  return {
    statusCode: 204,
    data: {},
  }
}

export function badRequest(error: Error): HttpResponse<Error> {
  return {
    statusCode: 400,
    data: error,
  }
}

export function undefinedRoute(): HttpResponse<Error> {
  return {
    statusCode: 404,
    data: new RouteNotFoundError(),
  }
}

export function unathorized(error: Error): HttpResponse<Error> {
  return {
    statusCode: 401,
    data: error,
  }
}

export function notFound(error: Error): HttpResponse<Error> {
  return {
    statusCode: 404,
    data: error,
  }
}

export function invalidParams(error: Error): HttpResponse<Error> {
  return {
    statusCode: 422,
    data: error,
  }
}

export function methodNotAllowed(): HttpResponse<Error> {
  return {
    statusCode: 405,
    data: new MethodNotAllowedError(),
  }
}

export function serverError(): HttpResponse<UnknownError> {
  return {
    statusCode: 500,
    data: new UnknownError(),
  }
}
