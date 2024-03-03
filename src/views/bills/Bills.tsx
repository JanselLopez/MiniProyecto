import { ColumnDef } from '@tanstack/react-table'
import { Bill } from '@/@types/models'
import { useMemo } from 'react'
import EntityView from '@/components/ui/EntityView'
import { entityProps } from './constants'
import { useBillQueryParams } from '@/utils/hooks/useBillQueryParams'
import { useFindBillsQuery } from '@/store/api/slices/bills'
import SelectEnterprise from '@/components/shared/SelectEnterprise'
import { useSearchParams } from 'react-router-dom'
import SelectCustomer from '@/components/shared/SelectCustomer'
import { Button } from '@/components/ui'
import { getPrettyDate } from '@/utils/get-pretty-date'
import { HiOutlineTrash } from 'react-icons/hi'

const Bills = () => {
  const params = useBillQueryParams()
  const [_, setSearchParams] = useSearchParams()
    const columns: ColumnDef<Bill>[] = useMemo(
        () => [
            {
                header: 'Correlativo',
                accessorKey: 'correlative_number',
            },
            {
                header: 'Cliente',
                accessorKey: 'client.business.name',
            },
            {
              header: 'Fecha de creada',
              accessorKey: 'created_at',
              cell: (props) => {
                const {created_at} = props.row.original
                return getPrettyDate(created_at)
              },
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
                {Object.keys(params).length !== 0 && <Button icon={<HiOutlineTrash />} size='sm' onClick={()=>setSearchParams({})}>Limpiar Filtros</Button>}
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
                      label:'1D',
                      days:1
                    },
                    {
                      label:'7D',
                      days:7
                    },
                    {
                      label:'1M',
                      days:30
                    },
                    {
                      label:'1Y',
                      days:365
                    }
                  ].map(({label,days})=><Button 
                    key={label}
                    size='sm'
                    variant={days===params.days?'solid':'default'}
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
