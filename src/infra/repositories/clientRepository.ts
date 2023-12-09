import { DatabaseConnection } from '@/infra/database/connections'
import { ClientAgreement, ClientListAgreement } from '@/infra/transformers'
import { DatabaseError } from '@/application/errors'
import { ClientRepositoryContract } from '@/application/contracts/repositories'

export class ClientRepository implements ClientRepositoryContract {
  constructor(
    private readonly db: DatabaseConnection,
    private readonly clientListTransformer: ClientListAgreement,
    private readonly clientTransformer: ClientAgreement
  ) {}

  async create(params: ClientRepositoryContract.Create.Params): Promise<ClientRepositoryContract.Create.Response> {
    const { uid, userUid, name, email, dateOfBirth, height, weight, phone, sex, createdAt } = params

    const query = `
      INSERT INTO clients (
        uid,
        user_uid,
        name,
        email,
        date_of_birth,
        height,
        weight,
        phone,
        sex,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const result = await this.db.execute(query, [uid, userUid, name, email, dateOfBirth, height, weight, phone, sex, createdAt.toISOString()])

    const client = await this.get({ uid })
    if (result.rowsAffected === 0 || !client) throw new DatabaseError('Data did not persist!')

    return client
  }

  async get(params: ClientRepositoryContract.Get.Params): Promise<ClientRepositoryContract.Get.Response> {
    const { uid } = params

    const query = `
      SELECT * 
      FROM clients 
      WHERE uid = ?
      AND deleted_at IS NULL
    `

    const result = await this.db.execute<ClientAgreement.Params>(query, [uid])
    if (result.rows.length === 0) return undefined

    return this.clientTransformer.transform(result.rows[0])
  }

  async getList(params: ClientRepositoryContract.GetList.Params): Promise<ClientRepositoryContract.GetList.Response> {
    const { userUid, paginationFilters, filters } = params

    const filterBy = {
      clientName: 'name',
      createdAt: 'created_at',
      lastEvaluatedAt: 'last_evaluated_at',
    }

    const query = `
      SELECT 
        uid,
        user_uid,
        name,
        phone,
        last_evaluated_at,
        created_at
      FROM clients
      WHERE user_uid = ?
      AND deleted_at IS NULL
      ${filters.search ? `AND ${filters.search.by} LIKE '%${filters.search.value}%'` : ''}
      ORDER BY ${filterBy[filters.by]} ${filters.order.toUpperCase()}
      LIMIT ${paginationFilters.pageSize} OFFSET ${(paginationFilters.currentPage - 1) * paginationFilters.pageSize}
    `

    const result = await this.db.execute<ClientListAgreement.Params>(query, [userUid])
    if (result.rows.length === 0) return []

    return result.rows.map(this.clientListTransformer.transform)
  }

  async update(params: ClientRepositoryContract.Update.Params): Promise<ClientRepositoryContract.Update.Response> {
    const { uid, attrs } = params

    const query = `
      UPDATE clients
      SET ${Object.keys(attrs).map((key) => `${key} = ?`).join(', ')}
      WHERE uid = ?
    `

    const result = await this.db.execute(query, [...Object.values(attrs), uid])
    if (result.rowsAffected === 0) throw new DatabaseError('Data did not persist!')

    return true
  }

  async delete(params: ClientRepositoryContract.Delete.Params): Promise<ClientRepositoryContract.Delete.Response> {
    const { uid } = params

    const query = `
      UPDATE clients
      SET deleted_at = ?
      WHERE uid = ?
      AND deleted_at IS NULL
    `

    const result = await this.db.execute(query, [new Date().toISOString(), uid])
    if (result.rowsAffected === 0) throw new DatabaseError('Data did not persist!')

    return true
  }
}


