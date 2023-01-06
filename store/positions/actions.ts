
import { of } from "rxjs";
import http from 'utils/http'
import {
    getResponse,
    resolveTimeout
} from 'helpers/mixins'
import {
    POSITIONS_GET
} from 'constants/endpoints'

export const getAction = (payload: any) => {
    let url = `${process.env.NEXT_APP_API_URL}/${POSITIONS_GET}.json`
    try {
        const params = {...payload}
        return new Promise((resolve, reject) => {
            http.get(url, params)
            .then((res: any) => {
                resolveTimeout(of(
                    resolve(res)
                ), 1000)
            }).catch((e: any) => {
                reject(e);
            });
        })
      } catch (e) {
        Promise.reject(console.log('e', e))
      }
}

export const getDetailAction = (id: any) => {
    let url = `${process.env.NEXT_APP_API_URL}/${POSITIONS_GET}/${id}`
    try {
        return new Promise((resolve, reject) => {
            http.get(url, {})
            .then((res: any) => {
                resolveTimeout(of(
                    resolve(res)
                ), 1000)
            }).catch((e: any) => {
                reject(e);
            });
        })
      } catch (e) {
        Promise.reject(console.log('e', e))
      }
}