import produce, {Draft} from "immer";
import create, { State, StateCreator } from "zustand";
import { 
  persist,
  devtools
} from 'zustand/middleware';
import lodashMerge from 'lodash.merge'
import { 
  AUTH_SET_LOGIN,
  AUTH_SET_LOGIN_LOADING
 } from './types';
import {
  ID_AUTH
} from 'constants/id'
export interface AuthState {
  id: string
  response: {
    id: string
    message: string
    title: string
    code: number
  }
  isLoggedIn: boolean,
  isLoading: boolean
}
export const INITIAL_STATE: AuthState = {
  id: ID_AUTH,
  response: {
    id: '',
    message: '',
    title: 'Auth Notification',
    code: 0
  },
  isLoggedIn: false,
  isLoading: false
};
const log =
<T extends State>(config: StateCreator<T>): StateCreator<T> =>
(set, get, api) =>
  config(
    (partial, replace) => {
      const nextState: any =
        typeof partial === "function"
          ? produce(partial as (state: Draft<T>) => T)
          : (partial as T);
      return set(nextState, replace);
    },
    get,
    api
)
let useLoginSlice: any = (set: any, get: any) => ({
    ...INITIAL_STATE,
    setLoginLoading: async () => {
      await set((state: any) => {
        state.login.isLoading = true
      }, 
      false, 
      {
        type: AUTH_SET_LOGIN_LOADING
      })
    },
    setLogin: async (val: boolean) => {
      await set((state: any) => {
        state.login.isLoggedIn = val
      }, 
      false, 
      {
        type: AUTH_SET_LOGIN
      })
    },
  })
let useAuth: any = (set: any, get: any) => ({
  login: useLoginSlice(set, get)
});


useAuth = devtools<any>(log(useAuth), 
  { 
    enabled: process.env.NODE_ENV === 'development' 
  }
)

const limitObject = (state: any, arr: string[] = 
  ['isLoading', 'response', 'fields', 'field', 'query']) => {
  const a = arr
  const k = Object.keys(state)
  if (k.length > 0) {
    const d = Object.fromEntries(
    Object.entries(state).filter(([key]) => 
    !a.includes(key)))
    return d
  }
}

useAuth = persist(useAuth, {
  version: 1, // a migration will be triggered if the version in the storage mismatches this one
  name: 'auth',
  getStorage: () => localStorage,
  partialize: (state: any) => ({ 
    login: limitObject(state.login)
  }),
  merge: (persistedState, currentState) =>
    lodashMerge(currentState, persistedState)
})
export default create(useAuth);
