import { TEN_YEARS } from '@/constants/api.constant'
import { baseApi } from '../baseApi'
import { Business, Category, Customer, Enterprise, Order } from '@/@types/models'
import { createCacheItem, deleteCacheItem, updateCacheItem } from '@/store/utils/funs'
import { entityKey } from '@/views/enterprises/constants'


const BASE = `enterprises/`

type BusinessRes = {
    business:Business
    coin:string
    description:string
}

// enterprise_id?:number
const toEnterprise = (it:BusinessRes)=>(({...it,...it.business}) as  Enterprise)

const enterprisesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEnterprises: builder.query<Enterprise[], string>({
            query: () => BASE,
            transformResponse:(res:{
                data:BusinessRes[]
            })=>res?.data?.map(toEnterprise)
            // keepUnusedDataFor: TEN_YEARS,
            // providesTags: [ORDERS_TAG],
        }),
        createEnterprise: builder.mutation({
            query:(body:Enterprise) => ({
                url:BASE,
                method:"POST",
                body
            }),
            transformResponse:(res:{
                data:BusinessRes
            })=>toEnterprise(res?.data),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                await createCacheItem(
                    entityKey,
                    'getEnterprises',
                    dispatch,
                    queryFulfilled,
                    enterprisesApi.util.updateQueryData
                )
            },
        }),
        updateEnterprise: builder.mutation({
            query:({id,...body}) => ({
                url:BASE + id,
                method:"PUT",
                body
            }),
            transformResponse:(res:{
                data:BusinessRes
            })=>toEnterprise(res?.data),
            async onQueryStarted(
                { id }: { id: number },
                { dispatch, queryFulfilled }: any
            ) {
                await updateCacheItem(
                    id,
                    entityKey,
                    'getEnterprises',
                    dispatch,
                    queryFulfilled,
                    enterprisesApi.util.updateQueryData
                )
            },
        }),
        deleteEnterprise: builder.mutation({
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
                    'getEnterprises',
                    dispatch,
                    queryFulfilled,
                    enterprisesApi.util.updateQueryData
                )
            },
        }),
    }),
})

export const { 
    useGetEnterprisesQuery, 
    useCreateEnterpriseMutation,
    useUpdateEnterpriseMutation,
    useDeleteEnterpriseMutation,
 } = enterprisesApi
