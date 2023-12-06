import { ClientAgreement, ClientListAgreement } from '@/infra/transformers'
import { Client } from '@/domain/entities'
import { QueryOperators } from '@/domain/enums'
import { FirebaseError } from '@/application/errors'
import { ClientRepositoryContract } from '@/application/contracts/repositories'

import { firestore } from 'firebase-admin'

export class ClientRepository implements ClientRepositoryContract {
  private readonly clientsRef: firestore.CollectionReference

  constructor(
    private readonly db: firestore.Firestore,
    private readonly clientListTransformer: ClientListAgreement,
    private readonly clientTransformer: ClientAgreement
  ) {
    this.clientsRef = this.db.collection('clients')
  }

  async create(params: ClientRepositoryContract.Create.Params): Promise<ClientRepositoryContract.Create.Response> {
    const { height, weight, uid, ...rest } = params

    try {
      const client: Client = {
        ...rest,
        uid,
        height: +height,
        weight: +weight,
        createdAt: new Date(),
      }

      await this.clientsRef.doc(uid).create(client)

      const result = await this.get({ uid })
      if (!result) throw new FirebaseError('Document did not persist')

      return result
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async get(params: ClientRepositoryContract.Get.Params): Promise<ClientRepositoryContract.Get.Response> {
    const { uid } = params

    try {
      const result = (await this.clientsRef.doc(uid).get()).data() as ClientAgreement.Params
      if (!result) return undefined

      return this.clientTransformer.transform(result)
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async getList(params: ClientRepositoryContract.GetList.Params): Promise<ClientRepositoryContract.GetList.Response> {
    const { userUid, paginationFilters, filters } = params

    try {
      let query = this.db.collection('clients')
        .where('userUid', QueryOperators.EQUAL, userUid)
        .select('uid', 'userUid', 'name', 'phone', 'lastEvaluatedAt', 'createdAt')
        .orderBy(filters.by, filters.order)
        .limit(+paginationFilters.pageSize)

      if (+paginationFilters.currentPage > 1) {
        const skipCount = (+paginationFilters.currentPage - 1) * +paginationFilters.pageSize
        const lastDoc = await this.clientsRef
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

      const clientList = result.docs.map((doc) => {
        const data = doc.data() as ClientListAgreement.Params
        return this.clientListTransformer.transform(data)
      })

      return clientList
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async update(params: ClientRepositoryContract.Update.Params): Promise<ClientRepositoryContract.Update.Response> {
    const { uid, attrs } = params
    try {
      await this.clientsRef.doc(uid).update(attrs)

      return true
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }

  async delete(params: ClientRepositoryContract.Delete.Params): Promise<ClientRepositoryContract.Delete.Response> {
    const { client } = params

    try {
      const uid = client.uid
      client.deletedAt = new Date()

      await this.db.collection('deleted_clients').doc(uid).create(client)
      await this.clientsRef.doc(uid).delete()

      return true
    } catch (error: any) {
      throw new FirebaseError(error.message)
    }
  }
}


