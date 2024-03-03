import EntityCreate from '@/components/ui/EntityCreate'
import { entityProps } from './constants'
import { useSearchParams } from 'react-router-dom'
import { useAddTermMutation } from '@/store/api/slices/terms'
import { useCreateTaxMutation } from '@/store/api/slices/taxes'

const TaxCreate = () => {
    const [params] = useSearchParams()
    const enterprise_id = params.get('enterprise_id')
    return (
        <EntityCreate
            useCreate={useCreateTaxMutation}
            rootRoute={`/enterprises/edit?id=${enterprise_id}`}
            entityKey={enterprise_id}
            transformRequest={(req) => ({
                ...req,
                enterprise_id,
            })}
            {...entityProps}
        ></EntityCreate>
    )
}

export default TaxCreate
