import React from 'react'
import { RichTextEditor } from '../shared'
import { useField, useFormikContext } from 'formik'

const RichText = ({label,name, disabled}:{
    label:string,name:string, disabled?:boolean
}) => {
    const formik = useFormikContext()
    const [field, meta] = useField(name)
    console.log({meta})
  return (
    <div className='space-y-2 mb-4'> 
        <p className='font-semibold'>{label}</p>
        <RichTextEditor 
        {
          ...(formik.dirty?{}:{
            value:meta.initialValue
          })
        }
        defaultValue={meta.initialValue} 
        onChange={(value)=>{
            formik.setFieldValue(name,value)
        }}
        readOnly={disabled}
        />
    </div>
  )
}

export default RichText