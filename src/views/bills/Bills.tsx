import { ColumnDef } from '@tanstack/react-table'
import { Customer } from '@/@types/models'
import { useMemo, useState } from 'react'
import EntityView from '@/components/ui/EntityView'
import { entityProps } from './constants'
import { useBillQueryParams } from '@/utils/hooks/useBillQueryParams'
import { useFindBillsQuery } from '@/store/api/slices/bills'
import SelectEnterprise from '@/components/shared/SelectEnterprise'
import { useSearchParams } from 'react-router-dom'
import SelectCustomer from '@/components/shared/SelectCustomer'
import { Button } from '@/components/ui'

const Bills = () => {
  const params = useBillQueryParams()
  const [_, setSearchParams] = useSearchParams()
    const columns: ColumnDef<Customer>[] = useMemo(
        () => [
            {
                header: 'Correlativo',
                accessorKey: 'correlative_number',
            },
            {
                header: 'Cliente',
                accessorKey: 'client.name',
            },
            {
              header: 'Fecha de creada',
              accessorKey: 'created_at',
            },
            {
              header: 'Servicio o Producto',
              accessorKey: 'item',
            },
            {
              header: 'Costo unitario',
              accessorKey: 'unit_cost',
            },
            {
              header: 'Costo total de Productos',
              accessorKey: 'total_price_product',
            },
            {
              header: 'Costo total de Factura',
              accessorKey: 'total_price_bill',
            },
        ],
        []
    )
    return (
        <EntityView
            columns={columns}
            useQuery={useFindBillsQuery}
            statusCode={params}
            title="Facturas"
            {...entityProps}
            toolItem={
              <>
                <SelectEnterprise 
                noTitle
                enterprise_id={params.enterpriseId} 
                setEnterpriseId={(enterpriseId)=>setSearchParams({...params, enterpriseId} as any)}/>
                <SelectCustomer 
                noTitle
                client_id={params.clientId}
                setClientId={(clientId)=>setSearchParams({...params, clientId} as any)}/>
                {
                  [
                    {
                      label:'dia',
                      days:1
                    },
                    {
                      label:'semana',
                      days:7
                    },
                    {
                      label:'mes',
                      days:30
                    },
                    {
                      label:'anno',
                      days:365
                    }
                  ].map(({label,days})=><Button 
                    key={label}
                    size='sm'
                    onClick={()=>setSearchParams({...params,days} as any)}
                    >
                      {label}
                    </Button>)
                }
              </>
            }
        />
    )
}

export default Bills
