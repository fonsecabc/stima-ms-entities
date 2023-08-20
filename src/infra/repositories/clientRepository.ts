import { QueryOperators } from '../../domain/enums'
import { ClientRepositoryContract } from '../../application/contracts'
import { Client, ClientListObject } from '../../domain/entities'

import * as firebase from 'firebase-admin'

export class ClientRepository implements ClientRepositoryContract {
    constructor(
        private readonly db: firebase.firestore.Firestore
    ) {}

    async create(params: ClientRepositoryContract.Create.Params): Promise<ClientRepositoryContract.Create.Response> {
        const { uid, userUid, name, email, phone, dateOfBirth, sex, height, weight } = params
        const client: Client = {
            uid,
            userUid,
            name,
            email,
            phone,
            dateOfBirth,
            sex,
            height: +height,
            weight: +weight,
            createdAt: new Date(),
        }

        return this.db.collection('clients').doc(uid).create(client).then(() => client)
    }

    async get(params: ClientRepositoryContract.Get.Params): Promise<ClientRepositoryContract.Get.Response> {
        const { uid } = params
        const client: Client = (
            await this.db.collection('clients').doc(uid).get()
        ).data() as Client

        return client ? {
            ...client,
            createdAt: client?.createdAt.toDate(),
            lastEvaluatedAt: client?.lastEvaluatedAt && client?.lastEvaluatedAt.toDate(),
        } : undefined
    }

    async getList(params: ClientRepositoryContract.GetList.Params): Promise<ClientRepositoryContract.GetList.Response> {
        const { userUid } = params
        const clientList: ClientListObject[] = (
            await this.db.collection('clients')
                .where('userUid', QueryOperators.EQUAL, userUid)
                .select('uid', 'userUid', 'name', 'phone', 'lastEvaluatedAt', 'createdAt')
                .get()
        ).docs.map((doc) => {
            const data = doc.data()
            return {
                ...data,
                createdAt: data?.createdAt.toDate(),
                lastEvaluatedAt: data?.lastEvaluatedAt && data?.lastEvaluatedAt.toDate(),
            }
        }) as ClientListObject[]

        return clientList
    }

    async getQuery(params: ClientRepositoryContract.GetQuery.Params): Promise<ClientRepositoryContract.GetQuery.Response> {
        const { userUid, query = { param: '', operator: QueryOperators.EQUAL, comparison: '' } } = params
        const clientList: ClientListObject[] = (
            await this.db.collection('clients')
                .where('userUid', QueryOperators.EQUAL, userUid)
                .where(query.param, query.operator, query.comparison)
                .select('uid', 'userUid', 'name', 'phone', 'lastEvaluatedAt', 'createdAt')
                .get()
        ).docs.map((doc) => {
            const data = doc.data()
            return {
                ...data,
                createdAt: data?.createdAt.toDate(),
                lastEvaluatedAt: data?.lastEvaluatedAt && data?.lastEvaluatedAt.toDate(),
            }
        }) as ClientListObject[]

        return clientList
    }

    async update(params: ClientRepositoryContract.Update.Params): Promise<ClientRepositoryContract.Update.Response> {
        const { uid, attrs } = params

        const client = await this.get({ uid })
        if (!client) return false

        return this.db.collection('clients').doc(uid).update(attrs).then(() => true)
    }

    async delete(params: ClientRepositoryContract.Delete.Params): Promise<ClientRepositoryContract.Delete.Response> {
        const { uid } = params
        const client = await this.get({ uid })
        if (!client) return false

        client.deletedAt = new Date()

        return Promise.all([
            this.db.collection('deleted_clients').doc(uid).create(client),
            this.db.collection('clients').doc(uid).delete(),
        ]).then(() => true)
    }
}


