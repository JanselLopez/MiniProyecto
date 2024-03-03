import EntityView from '@/components/ui/EntityView'
import React, { useMemo } from 'react'
import { entity } from './constants'
import ActionColumn from '@/components/ui/ActionColumn'
import { ColumnDef } from '@tanstack/react-table'
import { Tax } from '@/@types/models'
import { useSearchParams } from 'react-router-dom'
import { useDeleteTaxMutation, useGetTaxesQuery } from '@/store/api/slices/taxes'

const Taxes = () => {
    const [params] = useSearchParams()
    const id = params.get('id')
    const columns: ColumnDef<Tax>[] = useMemo(
        () => [
            {
                header: 'Nombre',
                accessorKey: 'name',
            },
            {
                header: 'Porciento',
                accessorKey: 'percentage',
            },
            {
                header: '',
                id: 'action',
                cell: (props) => {
                    return (
                        <ActionColumn
                            customParams={{
                                id: Number(props.row.original.id),
                                enterprise_id: id,
                            }}
                            useDelete={useDeleteTaxMutation}
                            entity={entity}
                            rootRoute={`/enterprises/edit?id=${id}`}
                            id={props.row.original.id}
                            editRoute={(route) =>
                                route + `&enterprise_id=${id}`
                            }
                        />
                    )
                },
            },
        ],
        []
    )
    return (
        <EntityView
            columns={columns}
            statusCode={id}
            title="Impuestos"
            useQuery={useGetTaxesQuery}
            entity={entity}
            onCreateRoute={(route) => route + '?enterprise_id=' + id}
        />
    )
}

export default Taxes
