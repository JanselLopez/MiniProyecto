import { BACKEND_URL, REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from '@/constants/api.constant'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { signInSuccess, signOutSuccess } from '../slices/auth'
import { getToken } from '@/utils/hooks/getToken'
import store from '../storeSetup'

const baseQuery = fetchBaseQuery({
    baseUrl: BACKEND_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    prepareHeaders: (headers, { getState }) => {
      const token = getToken()
      if (token) {
        headers.set(REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE + token)
      }
      return headers
    },
})

const baseQueryAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    if (refreshResult.data) {
      store.dispatch(signInSuccess(refreshResult.data as string))
      result = await baseQuery(args, api, extraOptions)
    } else {
      store.dispatch(signOutSuccess())
    }
  }
  return result
}

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryAuth,
    endpoints: () => ({}),
})