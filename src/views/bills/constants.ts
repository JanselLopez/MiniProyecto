import { InputProps } from '@/components/ui/EntityEdit'

export const rootRoute: string = '/bills'
export const entity: string = 'Factura'
export const fields: InputProps[] = [
    {
        name: 'item',
        label: 'Servicio o producto',
    },
    {
        name: 'amount',
        label: 'Cantidad',
        type: 'number'
    },
    {
        name: 'unit_cost',
        label: 'Costo por producto',
        type: 'number'
    },
]

export const entityProps = {
    rootRoute,
    entity,
    fields,
}
