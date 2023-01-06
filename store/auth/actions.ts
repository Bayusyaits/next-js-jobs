
import { of } from "rxjs";
import http from 'utils/http'
import {
    getResponse,
    resolveTimeout
} from 'helpers/mixins'
import {
    AUTH_LOGIN_POST
} from 'constants/endpoints'

export const setLoginAction = (payload: any) => {
    let url = `${process.env.NEXT_APP_API_URL}/${AUTH_LOGIN_POST}`
    let scope = null
    if (payload && payload.scope) {
        scope = payload.scope
        url += `/${scope}`
        delete payload.scope
    }
    if (payload && payload.uri) {
        url += `/${payload.uri}`
        delete payload.uri
    }
    try {
        return new Promise((resolve, reject) => {
            http.post(url, payload)
            .then((res: any) => {
                resolveTimeout(of(
                    resolve(getResponse(res))
                ), 1000)
            }).catch((e: any) => {
                reject(e);
            });
        })
      } catch (e) {
        Promise.reject(console.log('e', e))
      }
}