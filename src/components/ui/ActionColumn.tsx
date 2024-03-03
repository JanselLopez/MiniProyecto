import { useAppDispatch } from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import {
    setSelectedProduct,
    toggleDeleteConfirmation,
} from '@/views/sales/ProductList/store'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { EntityDeleteBtn } from './EntityDeleteBtn'
import { useChangeNotification } from './toast/toast'
import { OnDeleteCallback } from './EntityEdit'

const ActionColumn = ({
    id,
    customParams,
    entity,
    rootRoute,
    useDelete,
    editRoute,
}: {
    id: number
    customParams?: any
    entity: string
    rootRoute: string
    useDelete: any
    editRoute?: (route: string) => string
}) => {
    const dispatch = useAppDispatch()
    const [deleteItem] = useDelete()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()
    const deleteNotification = useChangeNotification(
        entity,
        'eliminado',
        rootRoute
    )

    const onEdit = () => {
        navigate(editRoute ? editRoute(`edit?id=${id}`) : `edit?id=${id}`)
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteItem(customParams || id)
        if (success) {
            deleteNotification()
        }
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <EntityDeleteBtn
                size="small"
                entity={entity}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default ActionColumn
