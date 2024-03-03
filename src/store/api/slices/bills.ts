import { TEN_YEARS } from '@/constants/api.constant'
import { baseApi } from '../baseApi'
import { Bill } from '@/@types/models'
import { BillQuery } from '@/@types/common'

const BASE = `bills`

export const billsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        findBills: builder.query<Bill[], string>({
            query: (params:BillQuery) => ({
                url:BASE,
                method:"GET",
                params
            }),
            transformResponse:(req:{data:Bill[]})=>req?.data,
            // keepUnusedDataFor: TEN_YEARS,
            providesTags: ["BILLS_TAG"],
        }),
        createBill: builder.mutation({
            query: (body) => ({
                url: BASE,
                method: 'POST',
                body
            }),
            invalidatesTags: ["BILLS_TAG"]
        }),
    }),
})

export const { useFindBillsQuery, useCreateBillMutation } = billsApi
