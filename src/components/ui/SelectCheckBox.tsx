import React from 'react'
import Checkbox from './Checkbox'
import Spinner from './Spinner'

const SelectCheckBox = ({setSelected, isLoading, data = [], title, valueKey = "id", labelKey = "name"}
    :{data?:any[], setSelected:any, isLoading:boolean, title:string, valueKey?:string, labelKey?:string}) => {
        
    const onChange = (value:any, isChecked:boolean) => {
            if (isChecked) {
                setSelected((prev:any[]) => [...prev,value])
            } else {
                setSelected((prev:any[]) => (prev.filter((it) => it != value)))
            }
        }
  
    return (
    <div>
        <h6 className='mb-2'>{title}</h6>
        {
            data?.map((it)=>{
                return <Checkbox key={it[valueKey]} onChange={(isChecked) => {
                    onChange(it.id, isChecked)
                }}
                value={it[valueKey]}>
                    {it[labelKey]}
                </Checkbox>
            })
        }
        {isLoading && <Spinner/>}
    </div>
  )
}

export default SelectCheckBox