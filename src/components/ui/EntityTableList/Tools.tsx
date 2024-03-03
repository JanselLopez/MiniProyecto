import Button from '@/components/ui/Button'
import { ReactNode } from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
// import ProductTableSearch from './ProductTableSearch'
import { Link } from 'react-router-dom'
import Input from '../Input'

const TableTools = ({
    entity,
    toolItem,
    onCreateRoute,
    createButtonTitle,
    disableCreateBtn,
    searcheable,
    setSearch,
}: {
    entity: string
    toolItem?: ReactNode
    onCreateRoute?: (route: string) => string
    createButtonTitle?:string
    disableCreateBtn?: boolean
    searcheable?:boolean
    setSearch?:(search:string)=>void
}) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {searcheable && <Input 
            onChange={(e)=>{
                setSearch && setSearch(e.target.value)
            }}
            placeholder={`Buscar ${entity}...`} />}
            {/* <ProductFilter /> */}
            {toolItem}
            {!disableCreateBtn && <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to={onCreateRoute ? onCreateRoute('create') : 'create'}
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    {createButtonTitle || `Crear ${entity}`}
                </Button>
            </Link>}
        </div>
    )
}

export default TableTools
