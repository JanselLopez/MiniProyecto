import { MetaData } from "@/@types/models";

export const metaData = (obj:{meta_data:MetaData[]} | undefined,findKey:string) => {
    let val
    obj?.meta_data?.forEach(({key,value})=>{
        if(key === findKey){
            val=value
        }
    })
    return val
}