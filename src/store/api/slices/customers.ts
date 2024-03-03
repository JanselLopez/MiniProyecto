import { Business, Customer } from '@/@types/models'
import { TEN_YEARS } from '@/constants/api.constant'
import { baseApi } from '../baseApi'
import { createCacheItem, deleteCacheItem, updateCacheItem } from '@/store/utils/funs'
import { entityKey } from '@/views/customers/constants'

const BASE = `clients/`

type BusinessRes = {
    business:Business
    enterprise_id:number
}

const toCustomer = (it:BusinessRes)=>(({...it,...it.business}) as  Customer)

const customersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<Customer[], string>({
            query: () => BASE,
            transformResponse:(res:{
                data:BusinessRes[]
            })=>res?.data?.map(toCustomer)
            // keepUnusedDataFor: TEN_YEARS,
            // providesTags: [ORDERS_TAG],
        }),
        createCustomer: builder.mutation({
            query:(body:Customer) => ({
                url:BASE,
                method:"POST",
                body
            }),
            transformResponse:(res:{
                data:BusinessRes
            })=>toCustomer(res?.data),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                await createCacheItem(
                    entityKey,
                    'getCustomers',
                    dispatch,
                    queryFulfilled,
                    customersApi.util.updateQueryData
                )
            },
        }),
        updateCustomer: builder.mutation({
            query:({id,...body}) => ({
                url:BASE + id,
                method:"PUT",
                body
            }),
            transformResponse:(res:{
                data:BusinessRes
            })=>toCustomer(res?.data),
            async onQueryStarted(
                { id }: { id: number },
                { dispatch, queryFulfilled }: any
            ) {
                await updateCacheItem(
                    id,
                    entityKey,
                    'getCustomers',
                    dispatch,
                    queryFulfilled,
                    customersApi.util.updateQueryData
                )
            },
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: BASE + id,
                method: 'DELETE',
            }),
            async onQueryStarted(
                id:number,
                { dispatch, queryFulfilled }: any
            ) {
                await deleteCacheItem(
                    id,
                    entityKey,
                    'getCustomers',
                    dispatch,
                    queryFulfilled,
                    customersApi.util.updateQueryData
                )
            },
        }),
    }),
})

export const { 
    useGetCustomersQuery, 
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
 } = customersApi
