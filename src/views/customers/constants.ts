import { InputProps } from '@/components/ui/EntityEdit'

export const entityKey: string = 'customers'
export const rootRoute: string = '/customers'
export const entity: string = 'Cliente'
export const fields: InputProps[] = [
    {
        name: 'name',
        label: 'Nombre',
    },
    {
        name: 'address',
        label: 'Dirección',
    },
    {
        name: 'phone',
        label: 'Teléfono',
        type: 'tel',
    },
    {
        name: 'dni',
        label: 'DNI',
    },
    {
        name: 'logo',
        label: 'Logo',
        type: 'image',
    }
]

export const entityProps = {
    entityKey,
    rootRoute,
    entity,
    fields,
}
