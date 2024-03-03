import { useNavigate, useSearchParams } from 'react-router-dom'
import { useChangeNotification } from '../toast/toast'
import { OnDeleteCallback } from '@/views/sales/ProductForm'
import {
    AdaptableCard,
    DoubleSidedImage,
    Loading,
    RichTextEditor,
    StickyFooter,
} from '@/components/shared'
import { Field, Form, Formik } from 'formik'
import { cloneDeep } from 'lodash'
import { FormContainer, FormItem } from '../Form'
import { ReactNode, useMemo, useState } from 'react'
import Button from '../Button'
import { AiOutlineSave } from 'react-icons/ai'
import Input from '../Input'
import * as Yup from 'yup'
import { useAddMediaMutation } from '@/store/api/slices/media'
import FieldImage from '@/views/sales/ProductForm/ProductImages'
import { EntityDeleteBtn } from '../EntityDeleteBtn'
import { imageToBase64 } from '@/utils/imgTo64'

export type InputProps = {
    name: string
    label: string
    placeholder?: string
    type?:
        | 'password'
        | 'text'
        | 'number'
        | 'tel'
        | 'email'
        | 'image'
        | 'checkboxSelect'
        | 'textarea'
    isDisabled?: (data: any) => boolean
    required?: boolean
    getDefaultValue?: (data:any) => any
}

export default ({
    fields,
    useUpdate,
    useQuery,
    useDelete,
    entityKey,
    entity,
    rootRoute,
    postComponent,
    transformRequest,
    transformDeleteRequest,
    deleteWithAllItemAsParam,
}: {
    fields: Array<InputProps>
    useUpdate: any
    useQuery: any
    useDelete: any
    entityKey?: any
    entity: string
    rootRoute: string
    postComponent?: ReactNode
    transformRequest?: (req: any) => any
    transformDeleteRequest?: (req: any) => any
    deleteWithAllItemAsParam?: boolean
}) => {
    const [params, setParams] = useSearchParams()
    const [update] = useUpdate()
    const [deleteItem] = useDelete()
    const navigate = useNavigate()
    const [uploadMedia, res] = useAddMediaMutation()
    const id = params.get('id')
    const { data, isLoading: loading, isFetching } = useQuery(entityKey)
    const isLoading = loading || isFetching
    const [images, setImages] = useState<{ [key: string]: File }>({})
    const item = data?.find((it: { id: number }) => it.id === Number(id)) || {}
    console.log({item,data})
    const updateNotification = useChangeNotification(
        entity,
        'actualizado',
        rootRoute
    )
    const deleteNotification = useChangeNotification(
        entity,
        'eliminado',
        rootRoute
    )
    const handleFormSubmit = async (
        values: any,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const imgKeys = Object.keys(images)
        for (const key of imgKeys) {
            const imgFile = images[key]
            values[key] = await imageToBase64(imgFile)
        }
        const success = await update(
            transformRequest ? transformRequest(values) : values
        )
        setSubmitting(false)
        if (success) {
            updateNotification()
        }
    }
    const handleDiscard = () => {
        navigate(rootRoute)
    }
    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        let params
        if(deleteWithAllItemAsParam){
            params = item
        }else if(transformDeleteRequest){
            params = transformDeleteRequest(item)
        }else{
            params = id
        }
        const success = await deleteItem(params)
        if (success) {
            deleteNotification()
        }
    }
    const schemaReducer: { [key: string]: any } = useMemo(() => {
        return fields
            .filter((it) => it.type !== 'image')
            .reduce((acc: { [key: string]: any }, curr) => {
                if (curr.isDisabled && curr.isDisabled(item)) {
                    return acc
                }
                if (curr.required === false) {
                    return acc
                }
                let yup
                switch (curr.type) {
                    case 'email':
                        yup = Yup.string().email(
                            `${curr.label} no es un email válido`
                        )
                        break
                    case 'number':
                        yup = Yup.number()
                        break
                }
                acc[curr.name] = (yup || Yup.string()).required(
                    `${curr.label} es requerido`
                )
                return acc
            }, {})
    }, [fields])
    const validationSchema = Yup.object().shape(schemaReducer)

    if (!isLoading && !item) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <DoubleSidedImage
                    src="/img/others/img-2.png"
                    darkModeSrc="/img/others/img-2-dark.png"
                    alt="No product found!"
                />
                <h3 className="mt-8">{entity} no encontrado</h3>
            </div>
        )
    }
    return (
        <>
            <Loading loading={isLoading}>
                <Formik
                    initialValues={item}
                    validationSchema={validationSchema}
                    onSubmit={(values: any, { setSubmitting }) => {
                        const formData = cloneDeep(values)
                        handleFormSubmit(formData, setSubmitting)
                    }}
                    validate={(data)=>console.log({data})}
                >
                    {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                        <Form>
                            <FormContainer>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="lg:col-span-2">
                                        <div className="mb-4">
                                            <h5>
                                                {entity}{' '}
                                                {item.name || `#${item.id}`}
                                            </h5>
                                            <p className="mb-6">
                                                Configura la información de tu{' '}
                                                {entity}
                                            </p>
                                            {fields
                                                .filter(
                                                    (it) => it.type !== 'image'
                                                )
                                                .map(
                                                    ({
                                                        name,
                                                        label,
                                                        placeholder,
                                                        type,
                                                        isDisabled,
                                                        getDefaultValue
                                                    }: InputProps) => {
                                                        if(!isDisabled || !isDisabled(item)){
                                                            if(type === 'textarea'){
                                                                return <div className='space-y-2 mb-4'> 
                                                                    <p className='font-semibold'>{label}</p>
                                                                    <RichTextEditor 
                                                                    defaultValue={item && (getDefaultValue ? getDefaultValue(item) : item[name])} 
                                                                    onChange={(value)=>{
                                                                        setFieldValue(name,value)
                                                                    }}/>
                                                                </div>
                                                            }else{
                                                                return <FormItem
                                                                label={label}
                                                                invalid={
                                                                    (errors[
                                                                        name
                                                                    ] &&
                                                                        touched[
                                                                            name
                                                                        ]) as boolean
                                                                }
                                                                errorMessage={
                                                                    errors[name]
                                                                }
                                                            >
                                                                <Field
                                                                    type={
                                                                        type ||
                                                                        'text'
                                                                    }
                                                                    autoComplete="off"
                                                                    name={name}
                                                                    {
                                                                        ...(type === 'number'?{min:0}:{})
                                                                    }
                                                                    placeholder={
                                                                        placeholder ||
                                                                        label
                                                                    }
                                                                    component={
                                                                        Input
                                                                    }
                                                                />
                                                            </FormItem>
                                                            }
                                                        }
                                                    }
                                                )}
                                        </div>
                                        {/* <BasicInformationFields
                                            touched={touched}
                                            errors={errors}
                                        /> */}
                                    </div>

                                    <div className="lg:col-span-1">
                                        {fields
                                            .filter((it) => it.type === 'image')
                                            .map(
                                                ({
                                                    name,
                                                    label,
                                                    placeholder,
                                                    type,
                                                    getDefaultValue,
                                                }: InputProps) => (
                                                    <FieldImage
                                                        name={name}
                                                        setData={(file) => {
                                                            setImages(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [name]: file,
                                                                })
                                                            )
                                                        }}
                                                        label={label}
                                                        defaultValue={getDefaultValue && getDefaultValue(item)}
                                                    />
                                                )
                                            )}
                                    </div>
                                </div>
                                {postComponent}
                                <StickyFooter
                                    className="-mx-8 px-8 flex items-center justify-between py-4"
                                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                >
                                    <div>
                                        <EntityDeleteBtn
                                            onDelete={handleDelete}
                                            entity={entity}
                                        />
                                    </div>
                                    <div className="md:flex items-center">
                                        <Button
                                            size="sm"
                                            className="ltr:mr-3 rtl:ml-3"
                                            type="button"
                                            onClick={handleDiscard}
                                        >
                                            Ir atrás
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            loading={isSubmitting}
                                            icon={<AiOutlineSave />}
                                            type="submit"
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                </StickyFooter>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </Loading>
        </>
    )
}
