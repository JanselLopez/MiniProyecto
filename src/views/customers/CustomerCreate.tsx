import EntityCreate from '@/components/ui/EntityCreate'
import { entityProps } from './constants'
import { useAddCategoryMutation } from '@/store/api/slices/categories'
import { useCreateCustomerMutation } from '@/store/api/slices/customers'
import { Select } from '@/components/ui'
import { useGetEnterprisesQuery } from '@/store/api/slices/enterprises'
import { entityKey } from '../enterprises/constants'
import { useState } from 'react'
import SelectEnterprise from '@/components/shared/SelectEnterprise'

const CustomerCreate = () => {
    const [enterprise_id,setEnterpriseId] = useState<number|undefined>()
    return (
        <EntityCreate
            useCreate={useCreateCustomerMutation}
            {...entityProps}
            transformRequest={(req)=>({...req,enterprise_id})}
            postComponent={
                <SelectEnterprise enterprise_id={enterprise_id} setEnterpriseId={setEnterpriseId}/>
            }
        ></EntityCreate>
    )
}

export default CustomerCreate
