// @flow
import axios from 'axios';
import type {State} from '../Types/data';
export function getStates(): Promise<Array<State>> {
  return axios.get(`/api/states`).then((result: any) => {
    return (result.data: Array<State>);
  });
}

export function getSystemStates(isCritical: boolean = false , top: number = 5, skip: number = 0): Promise<Array<any>> {
  return axios.get(`/api/services/system_state`, {
    params: {
      top,
      skip,
      isCritical
    }
  }).then((result: any) => {
    return result.data;
  });
}

export function getSystemStats():Promise<Object> {
  return axios.get('/api/services/system_stats')
    .then((result: any) => {
      return (result.data: Object);
    });
}
