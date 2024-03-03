import { TEN_YEARS } from "@/constants/api.constant"
import { baseApi } from "../baseApi"
import { customersApi } from "./customers"
import { billsApi } from "./bills"
import { taxesApi } from "./taxes"
import { enterprisesApi } from "./enterprises"

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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    window.location.reload()
                } catch (e) {
                    console.log({ e })
                }
            },
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