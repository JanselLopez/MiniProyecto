import { InputProps } from '@/components/ui/EntityEdit'

export const rootRoute: string = '/enterprises'
export const entity: string = 'Empresa'
export const title = "Empresas"
export const entityKey = "enterprises"
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
        name: 'logo',
        label: 'Logo',
        type: 'image',
    },
    {
        name: 'dni',
        label: 'DNI',
    },
    {
        name: 'coin',
        label: 'Moneda',
    },
    {
        name: 'description',
        label: 'Descripción',
    }
]

export const entityProps = {
    rootRoute,
    entity,
    fields,
    title,
    entityKey,
}
