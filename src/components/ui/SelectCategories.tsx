import { useGetCategoriesQuery } from '@/store/api/slices/categories'
import React from 'react'
import Spinner from './Spinner'
import Checkbox from './Checkbox'
import { Category } from '@/@types/models'
import { entityKey } from '@/views/categories/constants'

const SelectCategories = ({
    categories,
    setCategories,
    className = '',
}: {
    categories:number[]
    setCategories: (data: any) => any
    className?: string
}) => {
    const { data, isLoading } = useGetCategoriesQuery(entityKey)
    return (
        <div className={className}>
            <h4>Categorías</h4>
            {isLoading && <Spinner />}
            {data?.map((it) => {
                return (
                    <Checkbox
                        onChange={(isChecked) => {
                            setCategories((prev: number[]) => {
                                if (isChecked) {
                                    return [...prev, it.id]
                                } else {
                                    const array = prev.filter(
                                        (it2) => it2 !== it.id
                                    )
                                    return array
                                }
                            })
                        }}
                        checked={categories.includes(it.id)}
                        key={it.id}
                        value={it.name}
                    >
                        {it.name}
                    </Checkbox>
                )
            })}
        </div>
    )
}

export default SelectCategories
