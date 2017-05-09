// @flow
import axios from 'axios';
import type {Element, ElementWithState} from '../Types/data';

export function getElements(): Promise<Array<Element>> {
  return axios.get(`/api/elements`).then((result: any) => {
    return (result.data: Array<Element>);
  });
}

export function getElementsWithState(
  deep: number = 1
): Promise<Array<ElementWithState>> {
  return axios
    .get(`/api/elements`, {
      params: {
        withState: true,
        deep
      }
    })
    .then((result: any) => {
      return (result.data: Array<ElementWithState>);
    });
}

export function getElementsStats():Promise<Array<any>> {
  return axios.get('/api/services/elements_stats')
    .then((result: any) => {
      return (result.data: Array<any>);
    });
}
