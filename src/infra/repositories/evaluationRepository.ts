import { EvaluationListAgreement } from '@/infra/transformers'
import { Evaluation } from '@/domain/entities'
import { NutritionalRoutineStatus, QueryOperators } from '@/domain/enums'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'

import { firestore } from 'firebase-admin'

export class EvaluationRepository implements EvaluationRepositoryContract {
  private readonly evaluationsRef: firestore.CollectionReference

  constructor(
    private readonly db: firestore.Firestore,
    private readonly evaluationListTransformer: EvaluationListAgreement
  ) {
    this.evaluationsRef = this.db.collection('evaluations')
  }

  async create(params: EvaluationRepositoryContract.Create.Params): Promise<EvaluationRepositoryContract.Create.Response> {
    const { uid } = params
    const evaluation: any = {
      ...params,
      nutritionalRoutineStatus: NutritionalRoutineStatus.NOT_REQUESTED,
    }

    Object.keys(evaluation).forEach((key: any) => evaluation[key] === undefined && delete evaluation[key])

    return this.evaluationsRef.doc(uid).create(evaluation).then(() => evaluation).catch(() => undefined)
  }

  async get(params: EvaluationRepositoryContract.Get.Params): Promise<EvaluationRepositoryContract.Get.Response> {
    const { uid } = params
    const evaluation = (await this.evaluationsRef.doc(uid).get()).data()

    return {
      ...evaluation,
      createdAt: evaluation?.createdAt.toDate(),
    } as Evaluation
  }

  async getList(params: EvaluationRepositoryContract.GetList.Params): Promise<EvaluationRepositoryContract.GetList.Response> {
    const { userUid } = params

    const result = await this.evaluationsRef
      .where('userUid', QueryOperators.EQUAL, userUid)
      .select('uid', 'userUid', 'client.name', 'client.uid', 'nutritionalRoutineStatus', 'nutritionalRoutineLink', 'createdAt')
      .get()

    const evaluationList = result.docs.map((doc) => {
      const data = doc.data() as EvaluationListAgreement.Params

      return this.evaluationListTransformer.transform(data)
    })

    return evaluationList
  }

  async getQuery(params: EvaluationRepositoryContract.GetQuery.Params): Promise<EvaluationRepositoryContract.GetQuery.Response> {
    const { userUid, query, type = 'list' } = params

    if (type === 'list') {
      const result = await this.evaluationsRef
        .where('userUid', QueryOperators.EQUAL, userUid)
        .where(query.param, query.operator, query.comparison)
        .select('uid', 'userUid', 'client', 'nutritionalRoutineStatus', 'nutritionalRoutineLink', 'createdAt')
        .get()

      const evaluationList = result.docs.map((doc) => {
        const data = doc.data() as EvaluationListAgreement.Params

        return this.evaluationListTransformer.transform(data)
      })

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

    return this.evaluationsRef.doc(uid).update(attrs).then(() => true).catch(() => false)
  }

  async delete({ evaluation }: EvaluationRepositoryContract.Delete.Params): Promise<EvaluationRepositoryContract.Delete.Response> {
    const uid = evaluation.uid
    evaluation.deletedAt = new Date()

    return Promise.all([
      this.db.collection('deleted_evaluations').doc(uid).create(evaluation),
      this.evaluationsRef.doc(uid).delete(),
    ]).then(() => true).catch(() => false)
  }
}


