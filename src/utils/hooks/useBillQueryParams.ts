import { BillQuery } from "@/@types/common"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const paramsKeys:('clientId'|'days'|'enterpriseId')[] = ['clientId','days','enterpriseId']

export const useBillQueryParams = () => {
    const [searchParams] = useSearchParams()
    const [params, setParams] = useState<BillQuery>({})
    useEffect(()=>{
        const newParams:BillQuery = {}
        paramsKeys.forEach((key)=>{
            const value = searchParams.get(key)
            if(value){
                newParams[key] = Number(value)
            }
        })
        setParams(newParams)
    },[searchParams])
    return params
}