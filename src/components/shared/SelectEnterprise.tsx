import React from 'react'
import { Select, Spinner } from '../ui'
import { useGetEnterprisesQuery } from '@/store/api/slices/enterprises'
import { entityKey } from '@/views/enterprises/constants'

const SelectEnterprise = ({enterprise_id,setEnterpriseId,noTitle}:{
    enterprise_id?:number,
    setEnterpriseId:(enterprise_id:number)=>void,
    noTitle?:boolean,
}) => {
    const {data = [],isLoading} = useGetEnterprisesQuery(entityKey)
    if(isLoading) {
        return <Spinner/>
    }
    return (
        <>
            {!noTitle && <h6 className="mb-2">Empresa</h6>}
            <Select 
                placeholder={data?.find(({id})=>id===enterprise_id)?.name || "Empresa"}
                defaultValue={enterprise_id}
                options={data.map(({id,name})=>({label:name,value:id}))} 
                onChange={(option)=>{
                    setEnterpriseId(option?.value)
                }} 
            />
        </>
    )
}

export default SelectEnterprise