export enum NutritionalRoutineStatus {
  NOT_REQUESTED = 'not_requested',
  REQUESTED = 'requested',
  RECEIVED = 'received'
}

export namespace NutritionalRoutineStatus {
  export function fromValue(value: string): NutritionalRoutineStatus {
    const instances: [keys: string, value: NutritionalRoutineStatus][] = [
      ['not_requested', NutritionalRoutineStatus.NOT_REQUESTED],
      ['requested', NutritionalRoutineStatus.REQUESTED],
      ['received', NutritionalRoutineStatus.RECEIVED],
    ]

    const instance = instances.find((instance) => instance[0] === value)

    return instance ? instance[1] : NutritionalRoutineStatus.NOT_REQUESTED
  }
}
