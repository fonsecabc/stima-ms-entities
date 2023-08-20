import {
    GetClientsEvaluationHistoryValidatorFactory,
    GetClientsEvaluationHistoryServiceFactory,
} from '../../../main/factories'
import { InvalidParamError } from '../../errors'
import { NoDataError, NotFoundError } from '../../../domain/errors'
import { handleErrorService } from '../../../application/tasks'
import { GetClientsEvaluationHistoryUsecase } from '../../../domain/usecases'
import { HttpResponse, badRequest, invalidParams, noContent, notFound, success } from '../../helpers'

type Request = {
    userUid: string
    uid: string
}

export async function getClientsEvaluationHistoryController(request: Request): Promise<HttpResponse<GetClientsEvaluationHistoryUsecase.Response | Error>> {
    try {
        const isValid = await GetClientsEvaluationHistoryValidatorFactory.getInstance().make().validate(request)
        if (isValid instanceof InvalidParamError) return invalidParams(isValid)

        const clientsEvaluationHistory = await GetClientsEvaluationHistoryServiceFactory.getInstance().make().perform(request)
        if (clientsEvaluationHistory instanceof NoDataError) return noContent()
        if (clientsEvaluationHistory instanceof NotFoundError) return notFound(clientsEvaluationHistory)

        return success(clientsEvaluationHistory)
    } catch (err: any) {
        const error = await handleErrorService({ err })

        return badRequest(error)
    }
}
