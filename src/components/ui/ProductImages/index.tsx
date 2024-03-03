import { useState } from 'react'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { FormItem } from '@/components/ui/Form'
import Upload from '@/components/ui/Upload'
import {
    Field,
    FieldProps,
    useField,
} from 'formik'

type Image = {
    lastModified: number
    name: string
    size: number
    type: string
    webkitRelativePath: string
}

const FieldImage = ({
    name,
    setData,
    label,
    defaultValue,
}: {
    name: string
    label: string
    setData: (file: File) => void
    defaultValue?:string 
}) => {
    const [field, meta] = useField(name)
    const [currSrc, setCurrSrc] = useState(defaultValue || meta.initialValue)
    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 8000000

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

    const onUpload = (form: any, field: any, files: any) => {
        console.log({ form, field, files })
        const img = files[0]
        if (img) {
            const imgUrl = URL.createObjectURL(img)
            setCurrSrc(imgUrl)
            setData(img)
        }
    }

    return (
        <div className="mb-4">
            <h5>{label}</h5>
            {/* <p className="mb-6">Add or change image for the product</p> */}
            <FormItem>
                <Field name="imgList">
                    {({ field, form }: FieldProps) => {
                        return (
                            <Upload
                                draggable
                                beforeUpload={beforeUpload}
                                showList={false}
                                onChange={(files) =>
                                    onUpload(form, field, files)
                                }
                            >
                                <div className="my-16 text-center">
                                    <DoubleSidedImage
                                        className="mx-auto"
                                        src={
                                            currSrc || '/img/others/upload.png'
                                        }
                                        darkModeSrc={
                                            currSrc ||
                                            '/img/others/upload-dark.png'
                                        }
                                    />
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Arrastra aquí una imagen o{' '}
                                        </span>
                                        <span className="text-blue-500">
                                            examina
                                        </span>
                                    </p>
                                    <p className="mt-1 opacity-60 dark:text-white">
                                        Soportado: jpeg, png
                                    </p>
                                </div>
                            </Upload>
                        )
                    }}
                </Field>
            </FormItem>
        </div>
    )
}

export default FieldImage
