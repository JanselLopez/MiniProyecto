import { TEN_YEARS } from "@/constants/api.constant"
import { baseApi } from "../baseApi"

const BASE = `auth/`

const usersApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation ({
            query: body => ({
              url: `${BASE}login`,
              method: 'POST',
              body,
            }),
        }),
        logout: builder.mutation ({
            query: () => ({
              url: `${BASE}logout`,
              method: 'POST',
            }),
        }),
        register:builder.mutation({
            query: body => ({
                url:`${BASE}register`,
                method: 'POST',
                body,
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation,useRegisterMutation } = usersApi