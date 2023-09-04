import { GetOverviewFromEvaluationUsecase } from '../../../domain/usecases'

export class GetOverviewFromEvaluationTask implements GetOverviewFromEvaluationUsecase {
  async perform({ evaluationsEntitiesList }: GetOverviewFromEvaluationUsecase.Params): Promise<GetOverviewFromEvaluationUsecase.Response> {
    if (!evaluationsEntitiesList.length) return undefined

    const oldestEvaluation = evaluationsEntitiesList.reduce((prev, current) => {
      return prev.createdAt < current.createdAt ? prev : current
    })

    const newestEvaluation = evaluationsEntitiesList.reduce((prev, current) => {
      return prev.createdAt > current.createdAt ? prev : current
    })

    const newestBioimpedance = newestEvaluation.bioimpedance
    const oldestBioimpedance = oldestEvaluation.bioimpedance

    if (!newestBioimpedance || !oldestBioimpedance) return undefined

    const overallResults = {
      weight: newestEvaluation.client.weight - oldestEvaluation.client.weight,
      fatPercentage: +newestBioimpedance.fatPercentage - +oldestBioimpedance.fatPercentage,
      muscleMassPercentage: +newestBioimpedance.muscleMassPercentage - +oldestBioimpedance.muscleMassPercentage,
      visceralFat: +newestBioimpedance.visceralFat - +oldestBioimpedance.visceralFat,
    }

    const history: GetOverviewFromEvaluationUsecase.History = {
      weight: [],
      fatPercentage: [],
      muscleMassPercentage: [],
      basalMetabolicRate: [],
      metabolicAge: [],
      visceralFat: [],
    }

    evaluationsEntitiesList.forEach((evaluation) => {
      const client = evaluation.client
      const createdAt = evaluation.createdAt
      const bioimpedance = evaluation.bioimpedance

      if (!bioimpedance || !client) return

      history.weight.push(this.getHistoryObject(createdAt, client.weight))
      history.fatPercentage.push(this.getHistoryObject(createdAt, bioimpedance.fatPercentage))
      history.muscleMassPercentage.push(this.getHistoryObject(createdAt, bioimpedance.muscleMassPercentage))
      history.visceralFat.push(this.getHistoryObject(createdAt, bioimpedance.visceralFat))
      history.metabolicAge.push(this.getHistoryObject(createdAt, bioimpedance.metabolicAge))
      history.basalMetabolicRate.push(this.getHistoryObject(createdAt, bioimpedance.basalMetabolicRate))
    })

    if (!history.weight.length) return undefined

    return {
      overallResults,
      history,
    }
  }

  private getHistoryObject(date: Date, value: number) {
    return {
      date,
      value,
    }
  }
}
