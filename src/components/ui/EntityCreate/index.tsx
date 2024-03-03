import { useNavigate, useSearchParams } from 'react-router-dom'
import { useChangeNotification } from '../toast/toast'
import { OnDeleteCallback } from '@/views/sales/ProductForm'
import {
    AdaptableCard,
    ConfirmDialog,
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
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import Input from '../Input'
import * as Yup from 'yup'
import ProductImages from '@/views/sales/ProductForm/ProductImages'
import FieldImage from '@/views/sales/ProductForm/ProductImages'
import { useAddMediaMutation } from '@/store/api/slices/media'
import { randomUUID } from 'crypto'
import { InputProps } from '../EntityEdit'
import { imageToBase64 } from '@/utils/imgTo64'

export default ({
    fields,
    useCreate,
    entityKey,
    entity,
    rootRoute,
    transformRequest,
    postComponent,
    onSuccess,
}: {
    fields: Array<InputProps>
    useCreate: any
    entityKey: any
    entity: string
    rootRoute: string
    transformRequest?: (req: any) => any
    postComponent?: ReactNode
    onSuccess?: () => void
}) => {
    const [create] = useCreate()
    const navigate = useNavigate()
    const [uploadMedia, res] = useAddMediaMutation()
    const createNotification = useChangeNotification(
        entity,
        'creado',
        rootRoute
    )
    const [images, setImages] = useState<{ [key: string]: File }>({})
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
        
        const success = await create(
            transformRequest ? transformRequest(values) : values
        )
        setSubmitting(false)
        if (success) {
            createNotification()
            onSuccess && onSuccess()
        }
    }
    const handleDiscard = () => {
        navigate(rootRoute)
    }
    const schemaReducer: { [key: string]: any } = useMemo(() => {
        return fields
            .filter((it) => it.type !== 'image')
            .reduce((acc: { [key: string]: any }, curr) => {
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
    const initialData: { [key: string]: any } = useMemo(() => {
        return fields.reduce((acc: { [key: string]: any }, curr) => {
            acc[curr.name] = ''
            return acc
        }, {})
    }, [fields])
    return (
        <>
            <Formik
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={(values: any, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    handleFormSubmit(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <div className="mb-4">
                                        <h5>Crear {entity}</h5>
                                        <p className="mb-6">
                                            Configura la información de tu{' '}
                                            {entity}
                                        </p>
                                        {fields
                                            .filter((it) => it.type !== 'image')
                                            .map(
                                                ({
                                                    name,
                                                    label,
                                                    placeholder,
                                                    type,
                                                }: InputProps) => {
                                                    if(type === 'textarea'){
                                                        return <div className='space-y-2 mb-4'> 
                                                            <p className='font-semibold'>{label}</p>
                                                            <RichTextEditor 
                                                            onChange={(value)=>{
                                                                setFieldValue(name,value)
                                                            }}/>
                                                        </div>
                                                    }else{
                                                        return <FormItem
                                                        label={label}
                                                        invalid={
                                                            (errors[name] &&
                                                                touched[
                                                                    name
                                                                ]) as boolean
                                                        }
                                                        errorMessage={
                                                            errors[name] as (string | undefined)
                                                        }
                                                        >
                                                            <Field
                                                                type={
                                                                    type || 'text'
                                                                }
                                                                autoComplete="off"
                                                                name={name}
                                                                placeholder={
                                                                    placeholder ||
                                                                    label
                                                                }
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    }
                                                }
                                            )}
                                    </div>
                                    {postComponent}
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
                                            }: InputProps) => (
                                                <FieldImage
                                                    name={name}
                                                    setData={(file) => {
                                                        setImages((prev) => ({
                                                            ...prev,
                                                            [name]: file,
                                                        }))
                                                    }}
                                                    label={label}
                                                />
                                            )
                                        )}
                                </div>
                                <StickyFooter
                                    className="-mx-8 px-8 col-span-4 flex items-center justify-end py-4"
                                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                >
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
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
}
