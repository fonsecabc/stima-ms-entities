import {
    VerifyAccessTokenServiceFactory,
    DeleteClientValidatorFactory,
    DeleteClientServiceFactory,
} from '../../../main/factories'
import { InvalidParamError } from '../../errors'
import { handleErrorService } from '../../../application/tasks'
import { HttpResponse, badRequest, invalidParams, notFound, success, unathorized } from '../../helpers'
import { NotFoundError } from '../../../domain/errors'

type Request = {
    accessToken: string
    uid: string
}

export async function deleteClientController(request: Request): Promise<HttpResponse<true| Error>> {
    try {
        const isValid = await DeleteClientValidatorFactory.getInstance().make().validate(request)
        if (isValid instanceof InvalidParamError) return invalidParams(isValid)

        const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
        if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

        const isDeleted = await DeleteClientServiceFactory.getInstance().make().perform(request)
        if (!isDeleted) return notFound(new NotFoundError('client'))


        return success(isDeleted)
    } catch (err: any) {
        const error = await handleErrorService({ err })

        return badRequest(error)
    }
}
