import EntityEdit from '@/components/ui/EntityEdit'
import { entityKey, entityProps } from './constants'
import { useDeleteCustomerMutation, useGetCustomersQuery, useUpdateCustomerMutation } from '@/store/api/slices/customers'
import SelectEnterprise from '@/components/shared/SelectEnterprise'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const CustomerEdit = () => {
    const [enterprise_id,setEnterpriseId] = useState<number|undefined>()
    const {data = [], isLoading} = useGetCustomersQuery(entityKey)
    const [params] = useSearchParams()
    const customer_id = Number(params.get('id'))
    useEffect(() => {
      const customer = data?.find(({id})=>id===customer_id)
      setEnterpriseId(customer?.enterprise_id)
    }, [data])
    
    return (
        <EntityEdit
            useQuery={useGetCustomersQuery}
            useUpdate={useUpdateCustomerMutation}
            useDelete={useDeleteCustomerMutation}
            {...entityProps}
            postComponent={
                <SelectEnterprise enterprise_id={enterprise_id} setEnterpriseId={setEnterpriseId}/>
            }
        ></EntityEdit>
    )
}

export default CustomerEdit
