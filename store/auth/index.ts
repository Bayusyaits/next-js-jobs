import produce, {Draft} from "immer";
import create, { State, StateCreator } from "zustand";
import { 
  combine,
  persist,
  devtools,
  subscribeWithSelector 
} from 'zustand/middleware';

import { 
  AUTH_SET_LOGIN,
  AUTH_SET_LOGIN_LOADING,
  AUTH_SET_LOGIN_RESET,
  AUTH_SET_LOGOUT,
  AUTH_SET_PASSWORD,
  AUTH_SET_REGISTRATION
 } from './types';

import {
  setLoginAction
} from './actions'

import {
  ID_AUTH
} from 'constants/id'
export interface AuthState {
  id: string
  isLoading: boolean
  response: {
    id: string,
    message: string,
    title: string,
    code: number
  },
  login: {
    username: string | null
    password: string | null
    rememberMe: boolean
    flag: number
    isLoading: boolean
  }
  loginData: {
    accessToken?: string | null
    loggedIn: boolean
    otp: boolean
    _expires: Date | number
  }
  userData: {
    registerBy: string
    email: string
    salutation: string
    firstName: string
    lastName: string
    name: string
    mobilePrefix: string | number
    phoneNumber: string | number
    status: string
    account: string
    type: string
    role: string
    resetPasswordDate: string | null
    verifyPhoneNumberDate: string | null
    aggrementDate: string | null
    verifyEmailDate: string | null
    verifyDataDate: string | null
    username: string
  }
}
export const INITIAL_STATE: AuthState = {
  id: ID_AUTH,
  isLoading: false,
  response: {
    id: '',
    message: '',
    title: 'Login Notification',
    code: 0
  },
  login: {
    username: null,
    password: null,
    rememberMe: false,
    flag: 1,
    isLoading: false,
  },
  loginData: {
    accessToken: null,
    loggedIn: false,
    otp: false,
    _expires: 0,
  },
  userData: {
    registerBy: '',
    email: '',
    salutation: '',
    firstName: '',
    lastName: '',
    name: '',
    mobilePrefix: '',
    phoneNumber: '',
    status: '',
    account: '',
    type: '',
    role: '',
    resetPasswordDate: null,
    verifyPhoneNumberDate: null,
    aggrementDate: null,
    verifyEmailDate: null,
    verifyDataDate: null,
    username: '',
  }
};

type Actions = {
  setLogin: (payload: AuthState['login']) => void
  resetLogin: () => void
}

export type StateAuth = Actions & AuthState

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
let useAuth: any = 
  combine(subscribeWithSelector(() => ({...INITIAL_STATE})), 
  (set: any, get: any) => ({
    setLoading: async () => {
      await set({isLoading: true},
      false, 
      {
        type: AUTH_SET_LOGIN_LOADING,
      })
    },
    setLogin: async (payload: AuthState['login'], action?: any) => {
      const id = ID_AUTH
      const res: any = await setLoginAction(payload)
      const {data, ...obj} = res
      if (data && data.loginData) {
        await set(produce((draft: any) => {
          // Logic goes here
          let userData = data.userData
          if (data.userData && data.userData.fields) {
            userData = data.userData.fields
          }
          draft.isLoading = false
          draft.loginData = data.loginData
          draft.userData = userData
          draft.login = INITIAL_STATE['login']
          const response = {
            id,
            ...obj,
          }
          draft.response = response
          if (action && typeof action === 'function') {
            action(userData, response && response.code === 200)
          }
        }), 
        false, 
        {
          type: AUTH_SET_LOGIN,
          payload
        })
      } else if (obj && obj.code) {
        await set(
        {
          response: {...obj, id},
          isLoading: false
        },
        false, 
        {
          type: AUTH_SET_LOGIN,
          payload
        })
      }
    },
    resetLogin: () => {
      set({login: INITIAL_STATE['login']}, false, AUTH_SET_LOGIN_RESET)
    }    
  })
)
useAuth = devtools<StateAuth>(log(useAuth), 
  { 
    enabled: process.env.NODE_ENV === 'development' 
  }
)
useAuth = persist(useAuth, {
  name: 'auth',
  getStorage: () => localStorage,
  partialize: (state: any) =>
    Object.fromEntries(
      Object.entries(state).filter(([key]) => 
      !['isLoading', 'userData', 'login', 'response'].includes(key))
    )
})      
export default create(useAuth);
