import EntityCreate from '@/components/ui/EntityCreate'
import { entityProps } from './constants'
import { useCreateBillMutation } from '@/store/api/slices/bills'
import SelectCustomer from '@/components/shared/SelectCustomer'
import { useState } from 'react'
import SelectTaxes from '@/components/shared/SelectTaxes'
import { useGetCustomersQuery } from '@/store/api/slices/customers'
import { entityKey } from '../customers/constants'

const AttributesCreate = () => {
    const [client_id,setClientId] = useState<number>()
    const {data} = useGetCustomersQuery(entityKey)
    const client = data?.find(({id})=>id===client_id)
    const enterprise_id = client?.enterprise_id
    const [taxes, setTaxes] = useState([])
    return (
        <EntityCreate
            useCreate={useCreateBillMutation}
            entityKey={null}
            {...entityProps}
            transformRequest={(req)=>({...req,client_id,taxes})}
            postComponent={
                <>
                    <SelectCustomer 
                        client_id={client_id} 
                        setClientId={setClientId}
                    />
                    <SelectTaxes 
                        enterprise_id={enterprise_id} 
                        taxes={taxes} 
                        setTaxes={setTaxes}
                    />
                </>
            }
        ></EntityCreate>
    )
}

export default AttributesCreate
