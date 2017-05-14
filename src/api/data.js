//@flow
import axios from 'axios';
import type {Data} from '../Types/data';
export function getData(
  top: number = 50,
  skip: number = 0,
  filterConfig?: Object
): Promise<Array<Data>> {
  return axios.get(`/api/data`, {
    params: {
      top,
      skip,
      filterConfig
    }
  }).then((result: any) => {
    return (result.data: Array<Data>);
  });
}

export function getDataCount():Promise<number> {
  return axios.get(`/api/data/total`)
    .then((result) => {
      return (result.data: number);
    })
}

export function postData(dataSet: Object):Promise<number> {
  return axios.post(`/api/data`, dataSet)
    .then((result) => {
      return (result.data: number);
    })
}