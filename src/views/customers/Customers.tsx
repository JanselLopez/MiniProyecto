import { ColumnDef } from '@tanstack/react-table'
import { Customer } from '@/@types/models'
import { useMemo } from 'react'
import EntityView from '@/components/ui/EntityView'
import { entityKey, entityProps } from './constants'
import { useDeleteCustomerMutation, useGetCustomersQuery } from '@/store/api/slices/customers'
import { Avatar } from '@/components/ui'
import { FiPackage } from 'react-icons/fi'
import ActionColumn from '@/components/ui/ActionColumn'

const Customers = () => {
    const columns: ColumnDef<Customer>[] = useMemo(
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
                header: 'DNI',
                accessorKey: 'dni',
                sortable: false,
            },
            {
                header: '',
                id: 'action',
                cell: (props) => {
                    return <ActionColumn useDelete={useDeleteCustomerMutation} {...entityProps} id={props.row.original.id} />
                },
            },
        ],
        []
    )
    return (
        <EntityView
            columns={columns}
            useQuery={useGetCustomersQuery}
            statusCode={entityKey}
            title="Clientes"
            {...entityProps}
        />
    )
}

export default Customers
