import { useGetTaxesQuery } from "@/store/api/slices/taxes"
import { Checkbox, Spinner } from "../ui"

const SelectTaxes = ({
    enterprise_id,
    taxes,
    setTaxes,
    className = '',
}: {
    enterprise_id?:number,
    taxes:number[]
    setTaxes: (data: any) => any
    className?: string
}) => {
    const { data = [], isLoading } = useGetTaxesQuery(enterprise_id,{
        skip:!enterprise_id
    })
    return (
        <div className={className}>
            <h4>Impuestos</h4>
            {isLoading && <Spinner />}
            {!isLoading && data?.length === 0 && <p>No hay impuestos que mostrar</p>}
            {data?.map((it) => {
                return (
                    <Checkbox
                        onChange={(isChecked) => {
                            setTaxes((prev: number[]) => {
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
                        checked={taxes.includes(it.id)}
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

export default SelectTaxes
