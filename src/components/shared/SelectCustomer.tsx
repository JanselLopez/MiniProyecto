import React from 'react'
import { Select, Spinner } from '../ui'
import { useGetCustomersQuery } from '@/store/api/slices/customers'
import { entityKey } from '@/views/customers/constants'

const SelectCustomer = ({client_id,setClientId,noTitle}:{
    client_id?:number,
    setClientId:(client_id:number)=>void,
    noTitle?:boolean,
}) => {
    const {data = [],isLoading} = useGetCustomersQuery(entityKey)
    if(isLoading) {
        return <Spinner/>
    }
    return (
        <>
            {!noTitle && <h6 className="mb-2">Cliente</h6>}
            <Select 
                placeholder={data?.find(({id})=>id===client_id)?.name || "Cliente"}
                defaultValue={client_id}
                options={data.map(({id,name})=>({label:name,value:id}))} 
                onChange={(option)=>{
                    setClientId(option?.value)
                }} 
            />
        </>
    )
}

export default SelectCustomer