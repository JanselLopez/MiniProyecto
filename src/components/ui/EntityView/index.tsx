import { AdaptableCard, ColumnDef } from '@/components/shared'
import React, { ReactNode, useState } from 'react'
import EntityTableList from '../EntityTableList'
import TableTools from '../EntityTableList/Tools'

const EntityView = ({
    title,
    columns,
    useQuery,
    statusCode,
    entity,
    toolItem,
    onCreateRoute,
    createButtonTitle,
    disableCreateBtn,
}: {
    title: string
    columns: ColumnDef<any>[]
    useQuery: any
    statusCode: any
    entity: string
    toolItem?: ReactNode
    onCreateRoute?: (route: string) => string
    createButtonTitle?: string
    disableCreateBtn?: boolean
}) => {
    return (
        <div className="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">{title}</h3>
                <TableTools
                    createButtonTitle={createButtonTitle}
                    onCreateRoute={onCreateRoute}
                    toolItem={toolItem}
                    entity={entity}
                    disableCreateBtn={disableCreateBtn}
                />
            </div>
            <AdaptableCard>
                <EntityTableList
                    columns={columns}
                    useQuery={useQuery}
                    statusCode={statusCode}
                />
            </AdaptableCard>
        </div>
    )
}

export default EntityView
