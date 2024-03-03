export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    accessToken: string
    user: {
        id: number
        email: string
        name: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    name: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
