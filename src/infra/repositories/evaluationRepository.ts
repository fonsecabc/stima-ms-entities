import { EvaluationRepositoryContract } from '../../application/contracts'
import { Evaluation, EvaluationListObject } from '../../domain/entities'
import { NutritionalRoutineStatus, QueryOperators } from '../../domain/enums'

import { firestore } from 'firebase-admin'

export class EvaluationRepository implements EvaluationRepositoryContract {
  private readonly evaluationsRef: firestore.CollectionReference

  constructor(
        private readonly db: firestore.Firestore,
  ) {
    this.evaluationsRef = this.db.collection('evaluations')
  }

  async create(params: EvaluationRepositoryContract.Create.Params): Promise<EvaluationRepositoryContract.Create.Response> {
    const { uid } = params
    const evaluation: Evaluation = {
      ...params,
      nutritionalRoutineStatus: NutritionalRoutineStatus.NOT_REQUESTED,
      createdAt: new Date(),
    }

    return this.evaluationsRef.doc(uid).create(evaluation).then(() => evaluation)
  }

  async get(params: EvaluationRepositoryContract.Get.Params): Promise<EvaluationRepositoryContract.Get.Response> {
    const { uid } = params
    const evaluation: Evaluation = (await this.evaluationsRef.doc(uid).get()).data() as Evaluation

    return {
      ...evaluation,
      createdAt: evaluation?.createdAt.toDate(),
    }
  }

  async getList(params: EvaluationRepositoryContract.GetList.Params): Promise<EvaluationRepositoryContract.GetList.Response> {
    const { userUid } = params
    const evaluationList: EvaluationListObject[] = (
            await this.evaluationsRef
              .where('userUid', QueryOperators.EQUAL, userUid)
              .select('uid', 'userUid', 'client', 'nutritionalRoutineStatus', 'nutritionalRoutineLink', 'createdAt')
              .get()
        ).docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            clientName: data.client.name,
            clientUid: data.client.uid,
            createdAt: data.createdAt.toDate(),
          }
        }) as EvaluationListObject[]

    return evaluationList
  }

  async getQuery(params: EvaluationRepositoryContract.GetQuery.Params): Promise<EvaluationRepositoryContract.GetQuery.Response> {
    const { userUid, query, type = 'list' } = params

    if (type === 'list') {
      const evaluationList: EvaluationListObject[] = (
                await this.evaluationsRef
                  .where('userUid', QueryOperators.EQUAL, userUid)
                  .where(query.param, query.operator, query.comparison)
                  .select('uid', 'userUid', 'client', 'nutritionalRoutineStatus', 'nutritionalRoutineLink', 'createdAt')
                  .get()
            ).docs.map((doc) => {
              const data = doc.data()
              return {
                ...data,
                clientName: data?.client.name,
                clientUid: data?.client.uid,
                createdAt: data?.createdAt.toDate(),
              }
            }) as EvaluationListObject[]

      return evaluationList
    } else {
      const evaluationList: Evaluation[] = (
                await this.evaluationsRef
                  .where('userUid', QueryOperators.EQUAL, userUid)
                  .where(query.param, query.operator, query.comparison)
                  .get()
            ).docs.map((doc) => {
              const data = doc.data()
              return {
                ...data,
                client: {
                  ...data.client,
                  createdAt: data.client.createdAt.toDate(),
                },
                createdAt: data?.createdAt.toDate(),
              }
            }) as Evaluation[]

      return evaluationList
    }
  }

  async update(params: EvaluationRepositoryContract.Update.Params): Promise<EvaluationRepositoryContract.Update.Response> {
    const { uid, attrs } = params

    const evaluation = await this.get({ uid })
    if (!evaluation) return false

    return this.evaluationsRef.doc(uid).update(attrs).then(() => true)
  }

  async delete(params: EvaluationRepositoryContract.Delete.Params): Promise<EvaluationRepositoryContract.Delete.Response> {
    const { uid } = params
    const evaluation = await this.get({ uid })
    if (!evaluation) return false

    evaluation.deletedAt = new Date()

    return Promise.all([
      this.db.collection('deleted_evaluations').doc(uid).create(evaluation),
      this.evaluationsRef.doc(uid).delete(),
    ]).then(() => true)
  }
}


