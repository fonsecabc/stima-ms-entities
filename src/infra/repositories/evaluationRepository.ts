import { DatabaseConnection } from '@/infra/database/connections'
import { EvaluationAgreement, EvaluationListAgreement } from '@/infra/transformers'
import { Bioimpedance, Measurements, NutricionistForm, SkinFold } from '@/domain/entities'
import { DatabaseError } from '@/application/errors'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'

import { ResultSet } from '@libsql/client'

export class EvaluationRepository implements EvaluationRepositoryContract {
  constructor(
      private readonly db: DatabaseConnection,
      private readonly evaluationListTransformer: EvaluationListAgreement,
      private readonly evaluationTransformer: EvaluationAgreement
  ) {}

  async create(params: EvaluationRepositoryContract.Create.Params): Promise<EvaluationRepositoryContract.Create.Response> {
    const { uid, bioimpedance, nutricionistForm, measurements, skinFold } = params

    const bioimpedanceId = bioimpedance ? await this.createBioimpedance(bioimpedance) : null
    const nutricionistFormId = nutricionistForm ? await this.createNutricionistForm(nutricionistForm) : null
    const measurementsId = measurements ? await this.createMeasurements(measurements) : null
    const skinFoldId = skinFold ? await this.createSkinFold(skinFold) : null

    const query = `
        INSERT INTO evaluations (
          uid,
          user_uid,
          client_uid,
          client_name,
          weight,
          height,
          bioimpedance_id,
          nutricionist_form_id,
          measurements_id,
          skin_fold_id,
          nutritional_routine_status,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

    const result = await this.db.execute(query, [
      params.uid,
      params.userUid,
      params.clientUid,
      params.clientName,
      params.weight,
      params.height,
      bioimpedanceId,
      nutricionistFormId,
      measurementsId,
      skinFoldId,
      params.nutritionalRoutineStatus ?? null,
      params.createdAt.toISOString(),
    ])

    const evaluation = await this.get({ uid })
    if (result.rowsAffected === 0 || !evaluation) throw new DatabaseError('Data did not persist!')

    return evaluation
  }

  async get(params: EvaluationRepositoryContract.Get.Params): Promise<EvaluationRepositoryContract.Get.Response> {
    const { uid } = params

    const query = `
        SELECT 
          e.*,
          c.*,
          b.*,
          m.*,
          nf.*,
          sf.*
        FROM evaluations e 
        JOIN clients c                ON c.uid = e.client_uid
        JOIN bioimpedances b         ON b.id = e.bioimpedance_id
        JOIN measurements m          ON m.id = e.measurements_id
        JOIN nutricionist_forms nf   ON nf.id = e.nutricionist_form_id
        JOIN skin_folds sf           ON sf.id = e.skin_fold_id
        WHERE e.uid = ?
        AND e.deleted_at             IS NULL
      `

    const result = await this.db.execute<EvaluationAgreement.Params>(query, [uid])
    if (result.rows.length === 0) return undefined

    return this.evaluationTransformer.transform(result.rows[0])
  }

  async getEntitiesByClientUid(params: EvaluationRepositoryContract.GetEntitiesByClientUid.Params):
    Promise<EvaluationRepositoryContract.GetEntitiesByClientUid.Response> {
    const { clientUid } = params

    const query = `
        SELECT 
          e.*,
          c.* as client,
          b.* as bioimpedance,
          m.* as measurements,
          nf.* as nutricionist_form,
          sf.* as skin_fold
        FROM evaluations e 
        JOIN client c ON c.uid = e.client_uid
        JOIN bioimpedances b ON b.id = e.bioimpedance_id
        JOIN measurements m ON m.id = e.measurements_id
        JOIN nutricionist_forms nf ON nf.id = e.nutricionist_form_id
        JOIN skin_folds sf ON sf.id = e.skin_fold_id
        WHERE c.uid = ?
        AND e.deleted_at IS NULL
      `

    const result = await this.db.execute<EvaluationAgreement.Params>(query, [clientUid])
    if (result.rows.length === 0) return []

    return result.rows.map(this.evaluationTransformer.transform)
  }

  async getList(params: EvaluationRepositoryContract.GetList.Params): Promise<EvaluationRepositoryContract.GetList.Response> {
    const { userUid, paginationFilters, filters } = params

    const filterBy = {
      clientName: 'c.name',
      createdAt: 'e.created_at',
    }

    const query = `
        SELECT 
          e.uid,
          e.user_uid,
          e.client_uid,
          c.name as client_name,
          e.nutritional_routine_status,
          e.nutritional_routine_link,
          e.created_at
        FROM evaluations e 
        JOIN clients c ON c.uid = e.client_uid
        WHERE e.user_uid = ?
        AND e.deleted_at IS NULL
        ${filters.search ? `AND c.${filters.search.by} LIKE '%${filters.search.value}%'` : ''}
        ORDER BY ${filterBy[filters.by]} ${filters.order.toUpperCase()}
        LIMIT ${paginationFilters.pageSize} OFFSET ${(paginationFilters.currentPage - 1) * paginationFilters.pageSize}
      `

    const result = await this.db.execute<EvaluationListAgreement.Params>(query, [userUid])
    if (result.rows.length === 0) return []

    return result.rows.map(this.evaluationListTransformer.transform)
  }

  async update(params: EvaluationRepositoryContract.Update.Params): Promise<EvaluationRepositoryContract.Update.Response> {
    const { uid, attrs } = params

    const query = `
        UPDATE evaluations
        SET ${Object.keys(attrs).map((key) => `${key} = ?`).join(', ')}
        WHERE uid = ?
      `

    const result = await this.db.execute(query, [...Object.values(attrs), uid])
    if (result.rowsAffected === 0) throw new DatabaseError('Data did not persist!')

    return true
  }

  async delete(params: EvaluationRepositoryContract.Delete.Params): Promise<EvaluationRepositoryContract.Delete.Response> {
    const { uid } = params

    const query = `
        UPDATE evaluations
        SET deleted_at = ?
        WHERE uid = ?
      `

    const result = await this.db.execute(query, [new Date().toISOString(), uid])
    if (result.rowsAffected === 0) throw new DatabaseError('Data did not persist!')

    return true
  }

  private async createBioimpedance(params: Bioimpedance): Promise<number> {
    const query = `
        INSERT INTO bioimpedances (
          fat_percentage,
          muscle_mass_percentage,
          basal_metabolic_rate,
          metabolic_age,
          visceral_fat
        ) VALUES (?, ?, ?, ?, ?)
      `

    const result = await this.db.execute<ResultSet>(query, [
      params.fatPercentage ? Number(params.fatPercentage) : null,
      params.muscleMassPercentage ? Number(params.muscleMassPercentage) : null,
      params.basalMetabolicRate ? Number(params.basalMetabolicRate) : null,
      params.metabolicAge ? Number(params.metabolicAge) : null,
      params.visceralFat ? Number(params.visceralFat) : null,
    ])

    if (result.rowsAffected === 0 || !result.lastInsertRowid) throw new DatabaseError('Data did not persist!')

    return Number(result.lastInsertRowid)
  }

  private async createMeasurements(params: Measurements): Promise<number> {
    const query = `
        INSERT INTO measurements (
          right_bicep,
          left_bicep,
          shoulders,
          waist,
          hip,
          left_thigh,
          right_thigh,
          left_calf,
          right_calf
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

    const result = await this.db.execute<ResultSet>(query, [
      params.rightBicep ? Number(params.rightBicep) : null,
      params.leftBicep ? Number(params.leftBicep) : null,
      params.shoulders ? Number(params.shoulders) : null,
      params.waist ? Number(params.waist) : null,
      params.hip ? Number(params.hip) : null,
      params.leftThigh ? Number(params.leftThigh) : null,
      params.rightThigh ? Number(params.rightThigh) : null,
      params.leftCalf ? Number(params.leftCalf) : null,
      params.rightCalf ? Number(params.rightCalf) : null,
    ])

    if (result.rowsAffected === 0 || !result.lastInsertRowid) throw new DatabaseError('Data did not persist!')

    return Number(result.lastInsertRowid)
  }

  private async createNutricionistForm(params: NutricionistForm): Promise<number> {
    const query = `
        INSERT INTO Nutricionist_forms (
          objective,
          urine,
          intestine,
          pathologies,
          medicines,
          symptoms,
          appetite,
          wake_up_time,
          sleep_time,
          food_restrictions,
          eating_habits,
          habits,
          drinking_frequency,
          physical_activity,
          physical_activity_intensity,
          usual_breakfast,
          usual_morning_snack,
          usual_lunch,
          usual_evening_snack,
          usual_supper,
          favorite_foods,
          hated_foods,
          supplements,
          note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

    const result = await this.db.execute<ResultSet>(query, [
      params.objective,
      params.urine,
      params.intestine,
      params.pathologies,
      params.medicines,
      params.symptoms,
      params.appetite,
      params.wakeUpTime,
      params.sleepTime,
      params.foodRestrictions,
      params.eatingHabits,
      params.habits,
      params.drinkingFrequency,
      params.physicalActivity,
      params.physicalActivityIntensity,
      params.usualBreakfast,
      params.usualMorningSnack,
      params.usualLunch,
      params.usualEveningSnack,
      params.usualSupper,
      params.favoriteFoods,
      params.hatedFoods,
      params.supplements,
      params.note,
    ])

    if (result.rowsAffected === 0 || !result.lastInsertRowid) throw new DatabaseError('Data did not persist!')

    return Number(result.lastInsertRowid)
  }

  private async createSkinFold(params: SkinFold): Promise<number> {
    const query = `
        INSERT INTO skin_folds (
          chest,
          midaxillary,
          subscapular,
          biceps,
          triceps,
          abdominal,
          suprailiac,
          thigh,
          calf
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

    const result = await this.db.execute<ResultSet>(query, [
      params.chest ? Number(params.chest) : null,
      params.midaxillary ? Number(params.midaxillary) : null,
      params.subscapular ? Number(params.subscapular) : null,
      params.biceps ? Number(params.biceps) : null,
      params.triceps ? Number(params.triceps) : null,
      params.abdominal ? Number(params.abdominal) : null,
      params.suprailiac ? Number(params.suprailiac) : null,
      params.thigh ? Number(params.thigh) : null,
      params.calf ? Number(params.calf) : null,
    ])

    if (result.rowsAffected === 0 || !result.lastInsertRowid) throw new DatabaseError('Data did not persist!')

    return Number(result.lastInsertRowid)
  }
}
