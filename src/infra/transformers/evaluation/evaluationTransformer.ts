import { EvaluationAgreement, DataTransformer } from '@/infra/transformers'
import { NutritionalRoutineStatus, Sex } from '@/domain/enums'

export class EvaluationTransformer implements EvaluationAgreement {
  constructor(
    // private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: EvaluationAgreement.Params): EvaluationAgreement.Response {
    const { bioimpedance, measurements, nutricionist_form, skin_fold, client, ...evaluation } = params

    const dataTransformer = new DataTransformer()

    return {
      uid: evaluation.uid,
      userUid: evaluation.user_uid,
      client: {
        uid: client.uid,
        userUid: client.user_uid,
        name: dataTransformer.firstLetterUpperCaseStringTransform(client.name),
        email: dataTransformer.lowerCaseStringTransform(client.email),
        phone: client.phone,
        dateOfBirth: client.date_of_birth,
        sex: Sex.fromValue(client.sex),
        weight: Number(evaluation.weight),
        height: Number(evaluation.height),
        lastEvaluatedAt: client.last_evaluated_at ? new Date(client.last_evaluated_at) : undefined,
        createdAt: new Date(client.created_at),
        deletedAt: client.deleted_at ? new Date(client.deleted_at) : undefined,
      },
      bioimpedance: bioimpedance ? {
        fatPercentage: bioimpedance.fat_percentage ?? undefined,
        muscleMassPercentage: bioimpedance.muscle_mass_percentage ?? undefined,
        basalMetabolicRate: bioimpedance.basal_metabolic_rate ?? undefined,
        metabolicAge: bioimpedance.metabolic_age ?? undefined,
        visceralFat: bioimpedance.visceral_fat ?? undefined,
      } : undefined,
      measurements: measurements ? {
        rightBicep: measurements.right_bicep ?? undefined,
        leftBicep: measurements.left_bicep ?? undefined,
        shoulders: measurements.shoulders ?? undefined,
        waist: measurements.waist ?? undefined,
        hip: measurements.hip ?? undefined,
        leftThigh: measurements.left_thigh ?? undefined,
        rightThigh: measurements.right_thigh ?? undefined,
        leftCalf: measurements.left_calf ?? undefined,
        rightCalf: measurements.right_calf ?? undefined,
      } : undefined,
      nutricionistForm: nutricionist_form ? {
        objective: nutricionist_form.objective ?? undefined,
        urine: nutricionist_form.urine ?? undefined,
        intestine: nutricionist_form.intestine ?? undefined,
        pathologies: nutricionist_form.pathologies ?? undefined,
        medicines: nutricionist_form.medicines ?? undefined,
        symptoms: nutricionist_form.symptoms ?? undefined,
        appetite: nutricionist_form.appetite ?? undefined,
        wakeUpTime: nutricionist_form.wake_up_time ?? undefined,
        sleepTime: nutricionist_form.sleep_time ?? undefined,
        foodRestrictions: nutricionist_form.food_restrictions ?? undefined,
        eatingHabits: nutricionist_form.eating_habits ?? undefined,
        habits: nutricionist_form.habits ?? undefined,
        drinkingFrequency: nutricionist_form.drinking_frequency ?? undefined,
        physicalActivity: nutricionist_form.physical_activity ?? undefined,
        physicalActivityIntensity: nutricionist_form.physical_activity_intensity ?? undefined,
        usualBreakfast: nutricionist_form.usual_breakfast ?? undefined,
        usualMorningSnack: nutricionist_form.usual_morning_snack ?? undefined,
        usualLunch: nutricionist_form.usual_lunch ?? undefined,
        usualEveningSnack: nutricionist_form.usual_evening_snack ?? undefined,
        usualSupper: nutricionist_form.usual_supper ?? undefined,
        favoriteFoods: nutricionist_form.favorite_foods ?? undefined,
        hatedFoods: nutricionist_form.hated_foods ?? undefined,
        supplements: nutricionist_form.supplements ?? undefined,
        note: nutricionist_form.note ?? undefined,
      } : undefined,
      skinFold: skin_fold ? {
        chest: skin_fold.chest ?? undefined,
        midaxillary: skin_fold.midaxillary ?? undefined,
        subscapular: skin_fold.subscapular ?? undefined,
        biceps: skin_fold.biceps ?? undefined,
        triceps: skin_fold.triceps ?? undefined,
        abdominal: skin_fold.abdominal ?? undefined,
        suprailiac: skin_fold.suprailiac ?? undefined,
        thigh: skin_fold.thigh ?? undefined,
        calf: skin_fold.calf ?? undefined,
      } : undefined,
      nutritionalRoutineStatus: NutritionalRoutineStatus.fromValue(params.nutritional_routine_status),
      nutritionalRoutineLink: params.nutritional_routine_link ?? undefined,
      createdAt: new Date(evaluation.created_at),
      deletedAt: evaluation.deleted_at ? new Date(evaluation.deleted_at) : undefined,
    }
  }
}
