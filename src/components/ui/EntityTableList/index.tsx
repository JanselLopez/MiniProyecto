import { useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'

const EntityTableList = ({ columns, useQuery, statusCode }: { 
    columns: ColumnDef<any>[] 
    useQuery:any
    statusCode:any
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const { data, isLoading, isFetching } = useQuery(statusCode)
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={isLoading || isFetching}
            />
        </>
    )
}

export default EntityTableList
