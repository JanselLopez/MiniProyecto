import { TEN_YEARS } from '@/constants/api.constant'
import { baseApi } from '../baseApi'
import { Tax, Terms } from '@/@types/models'
import {
    createCacheItem,
    deleteCacheItem,
    updateCacheItem,
} from '@/store/utils/funs'

const BASE = 'taxes/'

const taxesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTaxes: builder.query<Terms[], number | undefined>({
            query: (enterprise_id) => `${BASE}find-by-enterprise/` + enterprise_id,
            transformResponse:(req:{data:Tax[]})=>req?.data
            // keepUnusedDataFor: TEN_YEARS,
        }),
        createTax: builder.mutation({
            query: (body) => ({
                url: BASE,
                method: 'POST',
                body: body,
            }),
            transformResponse:(req:{data:Tax[]})=>req?.data,
            async onQueryStarted({ enterprise_id }, { dispatch, queryFulfilled }) {
                await createCacheItem(
                    enterprise_id,
                    'getTaxes',
                    dispatch,
                    queryFulfilled,
                    taxesApi.util.updateQueryData
                )
            },
        }),
        updateTax: builder.mutation({
            query: ({ id, ...body }) => ({
                url: BASE + id,
                method: 'PUT',
                body ,
            }),
            transformResponse:(req:{data:Tax})=>req?.data,
            async onQueryStarted(
                { id, enterprise_id }: { id: number; enterprise_id: any },
                { dispatch, queryFulfilled }: any
            ) {
                await updateCacheItem(
                    id,
                    enterprise_id,
                    'getTaxes',
                    dispatch,
                    queryFulfilled,
                    taxesApi.util.updateQueryData
                )
            },
        }),
        deleteTax: builder.mutation({
            query: ({ id }) => ({
                url: BASE + id,
                method: 'DELETE',
            }),
            async onQueryStarted(
                { id, enterprise_id }: { id: number; enterprise_id: number },
                { dispatch, queryFulfilled }: any
            ) {
                console.log({enterprise_id})
                await deleteCacheItem(
                    id,
                    enterprise_id,
                    'getTaxes',
                    dispatch,
                    queryFulfilled,
                    taxesApi.util.updateQueryData
                )
            },
        }),
    }),
})

export const {
    useGetTaxesQuery,
    useDeleteTaxMutation,
    useUpdateTaxMutation,
    useCreateTaxMutation,
} = taxesApi
