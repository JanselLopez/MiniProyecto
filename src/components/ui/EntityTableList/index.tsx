import { useRef, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import { useCountQuery } from '@/store/api/slices/products'

const EntityTableList = ({ columns, useQuery, statusCode }: { 
    columns: ColumnDef<any>[] 
    useQuery:any
    statusCode:any
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const { data, isLoading } = useQuery(statusCode)
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={isLoading}
            />
        </>
    )
}

export default EntityTableList
