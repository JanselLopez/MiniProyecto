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
        register:builder.mutation({
            query: body => ({
                url:`${BASE}register`,
                method: 'POST',
                body,
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = usersApi