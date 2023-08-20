import { GetOverviewFromEvaluationUsecase } from '../../domain/usecases'

export class GetOverviewFromEvaluationTask implements GetOverviewFromEvaluationUsecase {
    async perform({ evaluationsEntitiesList }: GetOverviewFromEvaluationUsecase.Params): Promise<GetOverviewFromEvaluationUsecase.Response> {
        const oldestEvaluation = evaluationsEntitiesList.reduce((prev, current) => {
            return prev.createdAt < current.createdAt ? prev : current
        })

        const newestEvaluation = evaluationsEntitiesList.reduce((prev, current) => {
            return prev.createdAt > current.createdAt ? prev : current
        })

        const newestBioimpedance = JSON.parse(newestEvaluation.bioimpedance)
        const oldestBioimpedance = JSON.parse(oldestEvaluation.bioimpedance)

        const weight = +newestBioimpedance.weight - +oldestBioimpedance.weight
        const fatPercentage = +newestBioimpedance.fatPercentage - +oldestBioimpedance.fatPercentage
        const muscleMassPercentage = +newestBioimpedance.muscleMassPercentage - +oldestBioimpedance.muscleMassPercentage
        const visceralFat = +newestBioimpedance.visceralFat - +oldestBioimpedance.visceralFat

        const weightHistory = evaluationsEntitiesList.map((evaluation) => {
            const bioimpedance = JSON.parse(evaluation.bioimpedance)
            return this.getHistoryObject(evaluation.createdAt, +bioimpedance.weight)
        })

        const fatPercentageHistory = evaluationsEntitiesList.map((evaluation) => {
            const bioimpedance = JSON.parse(evaluation.bioimpedance)
            return this.getHistoryObject(evaluation.createdAt, +bioimpedance.fatPercentage)
        })

        const muscleMassPercentageHistory = evaluationsEntitiesList.map((evaluation) => {
            const bioimpedance = JSON.parse(evaluation.bioimpedance)
            return this.getHistoryObject(evaluation.createdAt, +bioimpedance.muscleMassPercentage)
        })

        const visceralFatHistory = evaluationsEntitiesList.map((evaluation) => {
            const bioimpedance = JSON.parse(evaluation.bioimpedance)
            return this.getHistoryObject(evaluation.createdAt, +bioimpedance.visceralFat)
        })

        const metabolicAgeHistory = evaluationsEntitiesList.map((evaluation) => {
            const bioimpedance = JSON.parse(evaluation.bioimpedance)
            return this.getHistoryObject(evaluation.createdAt, +bioimpedance.metabolicAge)
        })

        const basalMetabolicRateHistory = evaluationsEntitiesList.map((evaluation) => {
            const bioimpedance = JSON.parse(evaluation.bioimpedance)
            return this.getHistoryObject(evaluation.createdAt, +bioimpedance.basalMetabolicRate)
        })

        return {
            overallResults: {
                weight,
                fatPercentage,
                muscleMassPercentage,
                visceralFat,
            },
            history: {
                weight: weightHistory,
                fatPercentage: fatPercentageHistory,
                muscleMassPercentage: muscleMassPercentageHistory,
                basalMetabolicRate: basalMetabolicRateHistory,
                visceralFat: visceralFatHistory,
                metabolicAge: metabolicAgeHistory,
            },
        }
    }

    private getHistoryObject(date: string, value: number) {
        return {
            date,
            value,
        }
    }
}
