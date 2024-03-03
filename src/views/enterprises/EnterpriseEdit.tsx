import EntityEdit from '@/components/ui/EntityEdit'
import { entityProps } from './constants'
import { useDeleteEnterpriseMutation, useGetEnterprisesQuery, useUpdateEnterpriseMutation } from '@/store/api/slices/enterprises'
import Taxes from '../taxes/Taxes'

const EnterpriseEdit = () => {
    return (
        <EntityEdit
            useQuery={useGetEnterprisesQuery}
            useUpdate={useUpdateEnterpriseMutation}
            useDelete={useDeleteEnterpriseMutation}
            {...entityProps}
            postComponent={<Taxes/>}
        ></EntityEdit>
    )
}

export default EnterpriseEdit
