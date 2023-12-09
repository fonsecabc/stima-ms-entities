export enum Sex {
    FEMALE = 'female',
    MALE = 'male'
}

export namespace Sex {
    export function fromValue(value: string): Sex {
      const instances: [keys: string, value: Sex][] = [
        ['female', Sex.FEMALE],
        ['male', Sex.MALE],
      ]

      const instance = instances.find((instance) => instance[0] === value)

      return instance ? instance[1] : Sex.MALE
    }
  }
