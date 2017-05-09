// @flow

type Property = 'power' | 'isolation' | 'resistance';

export type Element = {
  _id: string,
  name: string,
  geo: {
    latitude: number,
    longitude: number
  }
}

export type State = {
  _id: string,
  name: string,
  adj: string,

  max: number,
  min: number,

  color: string,
  icon: string,
  notification: any,
  date: Date
}

export type Data = {
  _id: string,
  isolation: number,
  resistance: number,
  power: number,
  date: Date,
  element: Element,

  state: number,
  stateClass: State,
  forecastClass: State,
  message: string,
  shortMessage: string,
  criticalPropery: Property,
  isCrititcal: boolean,

  fuzzificatedData: {
    isolation: {
      state: number,
      stateClass: State
    },
    resistance: {
      state: number,
      stateClass: State
    },
    power: {
      state: number,
      stateClass: State
    }
  }
}

export type ElementWithState = {
  _id: string,
  name: string,
  geo: {
    latitude: number,
    longitude: number
  },
  lastState: number,
  lastStateClass: State,
  lastData: Array<Data>
}