import { cloneElement } from 'react'
import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-side-bg.png')`,
                }}
            >
                <Logo mode="dark" />
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        {/* <Avatar
                            className="border-2 border-white"
                            shape="circle"
                            src="/img/avatars/thumb-10.jpg"
                        /> */}
                        <div className="text-white">
                            <div className="font-semibold text-2xl">
                                Educamos contigo.
                            </div>
                        </div>
                    </div>
                    <p className="text-lg text-white opacity-80">
                        En <b>Momoi</b> fabricamos uniformes escolares de alta
                        calidad y, a su vez, transmitimos al alumno unos valores
                        educativos apropiados a la sociedad en la que vivimos.
                        Nuestros uniformes llevan este ADN, generamos un apoyo
                        directo al colegio. Educamos contigo.
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Side
