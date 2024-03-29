import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    name: string
    password: string
    email: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string()
        .email('El email es incorrecto')
        .required('El email es requerido'),
    password: Yup.string().required('La contrasenna es requerida').min(6, 'La contrasenna debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).*$/, 'mayúsculas, minúsculas, números y símbolos'),
    password_confirmation: Yup.string().oneOf(
        [Yup.ref('password')],
        'Las contrasennas son distintas'
    ),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const result = await signUp(values)

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    name: '',
                    password: '',
                    password_confirmation: '',
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Nombre"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Nombre"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Contrasenna"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Contrasenna"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="Confirmar contrasenna"
                                invalid={
                                    errors.password_confirmation &&
                                    touched.password_confirmation
                                }
                                errorMessage={errors.password_confirmation}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password_confirmation"
                                    placeholder="Confirmar contrasenna"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creando cuenta...'
                                    : 'Registrarse'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Ya tienes una cuenta? </span>
                                <ActionLink to={signInUrl}>Inicia sesión</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
