import {
    VerifyAccessTokenServiceFactory,
    UpdateEvaluationValidatorFactory,
    UpdateEvaluationServiceFactory,
} from '../../../main/factories'
import { InvalidParamError } from '../../errors'
import { NotFoundError } from '../../../domain/errors'
import { handleErrorService } from '../../../application/tasks'
import { HttpResponse, badRequest, invalidParams, notFound, success, unathorized } from '../../helpers'

type Request = {
    accessToken: string
    uid: string
    attrs: object
}

export async function updateEvaluationController(request: Request): Promise<HttpResponse<true | Error>> {
    try {
        const isValid = await UpdateEvaluationValidatorFactory.getInstance().make().validate(request)
        if (isValid instanceof InvalidParamError) return invalidParams(isValid)

        const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
        if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

        const isUpdated = await UpdateEvaluationServiceFactory.getInstance().make().perform(request)
        if (!isUpdated) return notFound(new NotFoundError('evaluation'))

        return success(isUpdated)
    } catch (err: any) {
        const error = await handleErrorService({ err })

        return badRequest(error)
    }
}
