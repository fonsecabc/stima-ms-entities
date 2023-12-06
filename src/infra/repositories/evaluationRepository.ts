import { EvaluationAgreement, EvaluationListAgreement } from '@/infra/transformers'
import { Evaluation } from '@/domain/entities'
import { NutritionalRoutineStatus, QueryOperators } from '@/domain/enums'
import { FirebaseError } from '@/application/errors'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'

import { firestore } from 'firebase-admin'

export class EvaluationRepository implements EvaluationRepositoryContract {
  private readonly evaluationsRef: firestore.CollectionReference

  constructor(
    private readonly db: firestore.Firestore,
    private readonly evaluationListTransformer: EvaluationListAgreement,
    private readonly evaluationTransformer: EvaluationAgreement
  ) {
    this.evaluationsRef = this.db.collection('evaluations')
  }

  async create(params: EvaluationRepositoryContract.Create.Params): Promise<EvaluationRepositoryContract.Create.Response> {
    const { uid } = params

    try {
      const evaluation: Evaluation = {
        ...params,
        nutritionalRoutineStatus: NutritionalRoutineStatus.NOT_REQUESTED,
      }

      await this.evaluationsRef.doc(uid).create(evaluation)

      const createdEvaluation = await this.get({ uid })
      if (!createdEvaluation) throw new FirebaseError('Document did not persist')

      return createdEvaluation
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async get(params: EvaluationRepositoryContract.Get.Params): Promise<EvaluationRepositoryContract.Get.Response> {
    const { uid } = params

    try {
      const result = (await this.evaluationsRef.doc(uid).get()).data() as EvaluationAgreement.Params
      if (!result) return undefined

      return this.evaluationTransformer.transform(result)
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async getEntitiesByClientUid(params: EvaluationRepositoryContract.GetEntitiesByClientUid.Params):
  Promise<EvaluationRepositoryContract.GetEntitiesByClientUid.Response> {
    const { clientUid } = params

    try {
      const query = this.evaluationsRef.where('client.uid', QueryOperators.EQUAL, clientUid)
      const result = await query.get()

      const evaluationsList = result.docs.map((doc) => {
        const data = doc.data() as EvaluationAgreement.Params
        return this.evaluationTransformer.transform(data)
      })

      return evaluationsList
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async getList(params: EvaluationRepositoryContract.GetList.Params): Promise<EvaluationRepositoryContract.GetList.Response> {
    const { userUid, paginationFilters, filters } = params

    try {
      let query = this.evaluationsRef
        .where('userUid', QueryOperators.EQUAL, userUid)
        .select('uid', 'userUid', 'client.name', 'client.uid', 'nutritionalRoutineStatus', 'nutritionalRoutineLink', 'createdAt')
        .orderBy(filters.by, filters.order)
        .limit(+paginationFilters.pageSize)

      if (+paginationFilters.currentPage > 1) {
        const skipCount = (+paginationFilters.currentPage - 1) * +paginationFilters.pageSize
        const lastDoc = await this.evaluationsRef
          .where('userUid', QueryOperators.EQUAL, userUid)
          .orderBy(filters.by, filters.order)
          .limit(skipCount)
          .get()

        if (lastDoc.docs.length > 0) {
          const lastDocSnapshot = lastDoc.docs[lastDoc.docs.length - 1]
          query = query.startAfter(lastDocSnapshot)
        }
      }

      const result = await query.get()

      const evaluationList = result.docs.map((doc) => {
        const data = doc.data() as EvaluationListAgreement.Params
        return this.evaluationListTransformer.transform(data)
      })

      return evaluationList
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async update(params: EvaluationRepositoryContract.Update.Params): Promise<EvaluationRepositoryContract.Update.Response> {
    const { uid, attrs } = params

    try {
      await this.evaluationsRef.doc(uid).update(attrs)

      return true
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async delete(params: EvaluationRepositoryContract.Delete.Params): Promise<EvaluationRepositoryContract.Delete.Response> {
    const { evaluation } = params

    try {
      const uid = evaluation.uid
      evaluation.deletedAt = new Date()

      await this.db.collection('deleted_evaluations').doc(uid).create(evaluation)
      await this.evaluationsRef.doc(uid).delete()

      return true
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }
}


