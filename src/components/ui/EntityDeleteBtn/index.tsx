import { OnDeleteCallback } from '@/views/sales/ProductForm'
import { useState } from 'react'
import Button from '../Button'
import { HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from '@/components/shared'

export const EntityDeleteBtn = ({
    onDelete,
    entity,
    size = 'large',
}: {
    onDelete: (callback: OnDeleteCallback) => void
    entity: string
    size?: 'small' | 'large'
}) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            {size === 'small' ? (
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onConfirmDialogOpen}
                >
                    <HiOutlineTrash />
                </span>
            ) : (
                <Button
                    className="text-red-600"
                    variant="plain"
                    size="sm"
                    icon={<HiOutlineTrash />}
                    type="button"
                    onClick={onConfirmDialogOpen}
                >
                    Eliminar
                </Button>
            )}
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title={`Eliminar ${entity}`}
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    ¿Está seguro que desea eliminar el {entity}?. Esta acción no
                    puede ser revertida.
                </p>
            </ConfirmDialog>
        </>
    )
}
