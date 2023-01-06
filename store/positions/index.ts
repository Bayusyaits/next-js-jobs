import produce, {Draft} from "immer";
import create, { State, StateCreator } from "zustand";
import { 
  persist,
  devtools
} from 'zustand/middleware';
import lodashMerge from 'lodash.merge'
import { 
  POSITIONS_GET_JOBS,
  POSITIONS_GET_JOBS_FAILURE,
  POSITIONS_SET_JOBS_LOADING,
  POSITIONS_GET_JOBS_DETAIL_FAILURE,
  POSITIONS_GET_JOBS_DETAIL,
  POSITIONS_RESET_JOBS
 } from './types';
 import {
  getAction,
  getDetailAction
} from './actions'
import {
  ID_POSITIONS
} from 'constants/id'
export interface PositionsFieldState {
  operator: string | null
  amount: number
  maxAmount: number
  typeCode: number
  code: string | null
  scope: string | null
  expiredDate: string | null
  title: string | null
  isJoin?: boolean
  addressCode?: string
  refCode?: string
  product: []
}
export interface PositionsState {
  id: string
  response: {
    id: string
    message: string
    title: string
    code: number
  }
  field: {
    sKUCode: string
  }
  isLoading: boolean
  query: {
    description?: string
    location?: string
    full_time?: string
    page: number
  }
  params: {}
  fields: []
}
export const POSITIONS_JOBS_INIT_FIELD = {
  operator: '',
  amount: 0,
  maxAmount: 0,
  typeCode: 0,
  code: '',
  scope: '',
  expiredDate: '',
  title: '',
  product: []
}
export const INITIAL_STATE: PositionsState = {
  id: ID_POSITIONS,
  response: {
    id: '',
    message: '',
    title: 'Positions Notification',
    code: 0
  },
  field: {
    sKUCode: ''
  },
  isLoading: false,
  query: {
    page: 1
  },
  params: {},
  fields: [],
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
let useJobsSlice: any = (set: any, get: any) => ({
    ...INITIAL_STATE,
    setJobsLoading: async () => {
      await set((state: any) => {
        state.jobs.isLoading = true
      }, 
      false, 
      {
        type: POSITIONS_SET_JOBS_LOADING
      })
    },
    resetAddress: () => {
      set({jobs: []}, false, POSITIONS_RESET_JOBS)
    },
    getJobs: async (
      payload?: PositionsState, 
      isLoad: boolean = false) => {
      const id = ID_POSITIONS
      const {jobs: {
        query
      }} = get()
      const params = payload || query
      try {
        const data: any = await getAction(params)
        await set(produce((state: any) => {
          if (state.jobs && state.jobs.isLoading) {
            state.jobs.isLoading = false
          }
          if (isLoad && data && Array.isArray(data)) {
            state.jobs.fields = data         
          } else if (data && Array.isArray(data)) {
            state.jobs.fields.push(...data)
          }
        }), 
        false, 
        {
          type: POSITIONS_GET_JOBS,
          params
        })
      } catch (e) {
        console.log(id, e)
        await set((state: any) => {
          state.jobs.isLoading = false
        }, 
        false, 
        {
          type: POSITIONS_GET_JOBS_FAILURE,
          params
        })
      }
    },
    getJobsDetail: async (
      payload?: string) => {
      const id = ID_POSITIONS
      const {jobs: {
        query
      }} = get()
      if (!payload) {
        await set(produce((state: any) => {
          state.jobs.isLoading = false
        }), 
          false, 
        {
          type: POSITIONS_GET_JOBS_DETAIL,
          payload
        })
      } else {
        try {
          const data: any = await getDetailAction(payload)
          await set(produce((state: any) => {
            if (state.jobs && state.jobs.isLoading) {
              state.jobs.isLoading = false
            }
            state.jobs.field = data         
          }), 
          false, 
          {
            type: POSITIONS_GET_JOBS_DETAIL,
            payload
          })
        } catch (e) {
          console.log(id, e)
          await set((state: any) => {
            state.jobs.isLoading = false
          }, 
          false, 
          {
            type: POSITIONS_GET_JOBS_DETAIL_FAILURE,
            payload
          })
        }
      }
    }
  })
let usePositions: any = (set: any, get: any) => ({
  jobs: useJobsSlice(set, get)
});


usePositions = devtools<any>(log(usePositions), 
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

usePositions = persist(usePositions, {
  version: 1, // a migration will be triggered if the version in the storage mismatches this one
  name: 'positions',
  getStorage: () => localStorage,
  partialize: (state: any) => ({ 
    jobs: limitObject(state.jobs)
  }),
  merge: (persistedState, currentState) =>
    lodashMerge(currentState, persistedState)
})
export default create(usePositions);
