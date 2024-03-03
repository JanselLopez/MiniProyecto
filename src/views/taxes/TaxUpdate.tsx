import EntityEdit from '@/components/ui/EntityEdit'
import { entityProps } from './constants'
import { useSearchParams } from 'react-router-dom'
import { useDeleteTaxMutation, useGetTaxesQuery, useUpdateTaxMutation } from '@/store/api/slices/taxes'

const TaxUpdate = () => {
    const [params] = useSearchParams()
    const enterprise_id = params.get('enterprise_id')
    return (
        <EntityEdit
            useQuery={useGetTaxesQuery}
            useUpdate={useUpdateTaxMutation}
            useDelete={useDeleteTaxMutation}
            rootRoute={`/enterprises/edit?id=${enterprise_id}`}
            entityKey={enterprise_id}
            transformRequest={(req) => ({
                ...req,
                enterprise_id,
            })}
            {...entityProps}
        ></EntityEdit>
    )
}

export default TaxUpdate
