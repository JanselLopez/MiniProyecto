import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Checkbox, Dialog, Input } from '../ui'
import { LineItem, Order, Product, RefundMap } from '@/@types/models'
import { ProductColumn } from '@/views/products/Products'
import { useUpdateOrderMutation } from '@/store/api/slices/ordersApi'
import ConfirmDialog from './ConfirmDialog'

const SelectProductDialog = (
    {isOpen, setDialogData, updateOrder, res, dialogData, order, onClose, refundsMap, products, refund, orderId, ...rest}
    :{isOpen:boolean,updateOrder:any, res:any, setDialogData:any, dialogData?:any, order?:Order ,onClose:()=>void, refundsMap?:RefundMap, products?:LineItem[], refund?:{line_items:[],reason:string,tipo:string}, orderId:number}
    ) => {
    console.log({refundsMap})
    const [items, setItems] = useState<{
            [key: number]: number;
    }>({});
    useEffect(()=>{
        if(refundsMap){
            setItems(
                Object.keys(refundsMap).reduce((acc,curr)=>{
                    const id = Number(curr)
                    acc[id] = refundsMap[id]?refundsMap[id].quantity:0
                    return acc
                },{})
            )
        }
    },[refundsMap, dialogData])
    useEffect(()=>{
        res.isSuccess && onClose()
    },[res])
        const handleRefund = () => {
            const line_items: {
              id: string;
              product_id: number;
              variation_id: number;
              quantity: number;
            }[] = [];
            Object.keys(items).forEach((it: string) => {
              const curr = refundsMap && refundsMap[Number(it)];
              curr && items[Number(it)] !==0 && line_items.push({
                id: it,
                product_id: curr.product_id,
                variation_id: curr.variation_id,
                quantity: items[Number(it)],
              });
            });
            if(line_items.length){
                const newRefund = {id:orderId,
                    status: "refunded",
                    meta_data: [
                      {
                        key: "_refunds",
                        value: {
                          ...refund,
                          line_items,
                        },
                      },
                    ],}
                setDialogData({
                    status:"refunded",
                    function:()=>updateOrder(newRefund)
                })
            }else{
                setDialogData({
                    status:"completed",
                    function:()=>updateOrder({
                        id:Number(orderId),
                        status:'completed'
                    })
                })
            }
          };
    return (
    <Dialog isOpen={isOpen && !dialogData} onClose={onClose} closable={true} {...rest}>
        <h4>Reembolso del pedido #{orderId}</h4>
        <div className='space-y-4 mt-8'>
            {
                products?.map((it)=>{
                    const max = refundsMap && refundsMap[it.variation_id || it.product_id] && refundsMap[it.variation_id || it.product_id].quantity
                    return <div className='flex items-center'>
                        {/* <Checkbox/> */}
                        <div className='w-full'>
                        <ProductColumn row={it}/>
                        </div>
                        <Input onChange={(e)=>{
                            const val = e.target.value
                            setItems((prev) => ({ ...prev, [it.variation_id || it.product_id]: Number(val) }));
                        }} defaultValue={max} max={max} min={0} type='number' className='max-w-[100px]'/>
                    </div>
                })
            }
        </div>
        <div className='flex gap-4 w-full mt-8'>
            <Button onClick={onClose} className='w-full'>
                Atrás
            </Button>
            <Button loading={res.isLoading} onClick={handleRefund} className='w-full' variant='solid'>
                Aceptar
            </Button>
        </div>
    </Dialog>
  )
}

export default SelectProductDialog