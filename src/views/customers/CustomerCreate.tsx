import EntityCreate from '@/components/ui/EntityCreate'
import { entityProps } from './constants'
import { useCreateCustomerMutation } from '@/store/api/slices/customers'
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
