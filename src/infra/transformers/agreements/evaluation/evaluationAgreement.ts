import { Evaluation } from '@/domain/entities'

export interface EvaluationAgreement {
  transform: (params: EvaluationAgreement.Params) => EvaluationAgreement.Response
}

export namespace EvaluationAgreement {
  export type Params = {
    uid: string
    user_uid: string
    client_uid: string
    client_name: string
    weight: number
    height: number
    bioimpedance_id: string | null
    measurements_id: string | null
    nutricionist_form_id: string | null
    skin_fold_id: string | null
    nutritional_routine_status: string
    nutritional_routine_link: string | null
    created_at: string
    deleted_at: string | null
    client: {
      uid: string
      user_uid: string
      name: string
      email: string
      phone: string
      date_of_birth: string
      sex: string
      weight: number
      height: number
      last_evaluated_at: string | null
      created_at: string
      deleted_at: string | null
    }
    bioimpedance: {
      id: string
      fat_percentage: number | null
      muscle_mass_percentage: number | null
      basal_metabolic_rate: number | null
      metabolic_age: number | null
      visceral_fat: number | null
    } | null
    measurements: {
      id: string | null
      right_bicep: number | null
      left_bicep: number | null
      shoulders: number | null
      waist: number | null
      hip: number | null
      left_thigh: number | null
      right_thigh: number | null
      left_calf: number | null
      right_calf: number | null
    } | null
    nutricionist_form: {
      id: string
      objective: string | null
      urine: string | null
      intestine: string | null
      pathologies: string | null
      medicines: string | null
      symptoms: string | null
      appetite: string | null
      wake_up_time: string | null
      sleep_time: string | null
      food_restrictions: string | null
      eating_habits: string | null
      habits: string | null
      drinking_frequency: string | null
      physical_activity: string | null
      physical_activity_intensity: string | null
      usual_breakfast: string | null
      usual_morning_snack: string | null
      usual_lunch: string | null
      usual_evening_snack: string | null
      usual_supper: string | null
      favorite_foods: string | null
      hated_foods: string | null
      supplements: string | null
      note: string | null
    } | null
    skin_fold: {
      id: string
      chest: number | null
      midaxillary: number | null
      subscapular: number | null
      biceps: number | null
      triceps: number | null
      abdominal: number | null
      suprailiac: number | null
      thigh: number | null
      calf: number | null
    } | null
  }

  export type Response = Evaluation
}
