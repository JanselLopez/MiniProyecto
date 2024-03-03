import EntityCreate from '@/components/ui/EntityCreate'
import { entityProps } from './constants'
import { useCreateEnterpriseMutation } from '@/store/api/slices/enterprises'

const EnterpriseCreate = () => {
    return (
        <EntityCreate
            useCreate={useCreateEnterpriseMutation}
            {...entityProps}
        ></EntityCreate>
    )
}

export default EnterpriseCreate
