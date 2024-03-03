import { InputProps } from '@/components/ui/EntityEdit'

export const entity = 'Impuesto'

export const fields: InputProps[] = [
    {
        name: 'name',
        label: 'Nombre',
    },
    {
        name: 'percentage',
        label: 'Porciento'
    }
]

export const entityProps = {
    entity,
    fields,
}
