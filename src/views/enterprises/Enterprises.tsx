import { Category, Enterprise } from '@/@types/models'
import { Avatar } from '@/components/ui'
import ActionColumn from '@/components/ui/ActionColumn'
import EntityView from '@/components/ui/EntityView'
import { useDeleteCategoryMutation, } from '@/store/api/slices/categories'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { entityKey, entityProps } from './constants'
import { useCreateEnterpriseMutation, useDeleteEnterpriseMutation, useGetEnterprisesQuery } from '@/store/api/slices/enterprises'
import { FiPackage } from 'react-icons/fi'

const Enterprises = () => {
    const columns: ColumnDef<Enterprise>[] = useMemo(
        () => [
            {
                header: 'Logo',
                accessorKey: 'logo',
                cell: (props) => {
                    const {logo} = props.row.original
                    return logo?<Avatar src={logo}/>:<Avatar icon={<FiPackage />} />
                },
            },
            {
                header: 'Nombre',
                accessorKey: 'name',
                sortable: true,
            },
            {
                header: 'Descripción',
                accessorKey: 'description',
                sortable: false,
            },
            {
                header: 'DNI',
                accessorKey: 'dni',
                sortable: false,
            },
            {
                header: '',
                id: 'action',
                cell: (props) => {
                    return <ActionColumn useDelete={useDeleteEnterpriseMutation} {...entityProps} id={props.row.original.id} />
                },
            },
        ],
        []
    )
    return (
        <EntityView
            columns={columns}
            useQuery={useGetEnterprisesQuery}
            statusCode={entityKey}
            {...entityProps}
        />
    )
}

export default Enterprises
