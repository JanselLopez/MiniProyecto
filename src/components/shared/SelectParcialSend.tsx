import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Checkbox, Dialog, Input } from '../ui'
import { LineItem, ParcialSend, Product, RefundMap } from '@/@types/models'
import { ProductColumn } from '@/views/products/Products'
import { useUpdateOrderMutation } from '@/store/api/slices/ordersApi'
import { HiArrowCircleLeft, HiArrowCircleRight, HiArrowNarrowRight } from 'react-icons/hi'

const SelectParcialSend = (
    {isOpen, setDialogData, updateOrder, res, dialogData, order, onClose, parcialSendMap, parcialSendHistory, products, refund, orderId, ...rest}
    :{isOpen:boolean, updateOrder:any, res:any,  setDialogData:any, dialogData?:any,order?:Order , onClose:()=>void, parcialSendMap:{[key:number]:number}, parcialSendHistory:ParcialSend[], products?:LineItem[], refund?:{line_items:[],reason:string,tipo:string}, orderId:number}
    ) => {
    const [items, setItems] = useState<{
            [key: number]: number;
    }>({});
    console.log({parcialSendHistory})
    const isNoDirty = Object.keys(items).every((key:string)=> {
        const min = parcialSendMap[Number(key)] || 0
        return (items[Number(key)] === min)
    })
    const lineItemsMap = useMemo(
        ()=>{
            return products?.reduce((acc:{[key:number]:number},curr:LineItem)=>{
                acc[curr.variation_id || curr.product_id]  =  curr.quantity
                return acc
            },{})
        }
    ,[products]) 
    useEffect(()=>{
        if(products){
            setItems(lineItemsMap!)
        }
    },[products, isOpen, dialogData])
    useEffect(()=>{
        res.isSuccess && onClose()
    },[res])
    console.log({items})
    const handleSend = () => {
        const isCompleted = Object.keys(items).every((key:string)=> (lineItemsMap && items[Number(key)] === lineItemsMap[Number(key)]))
        if(isNoDirty){
            return 
        }
            const lineItems = products?.reduce((acc:{[key:number]:LineItem},curr:LineItem)=>{
                acc[curr.variation_id || curr.product_id]  =  curr
                return acc
            },{})
            const itemsHistory = Object.keys(lineItems!).reduce((acc:{[key:number]:{
                line_item:LineItem
                quantity:number
            }},curr:string)=>{
                const key = Number(curr)
                const min = parcialSendMap[key] || 0 
                acc[key] = {
                    line_item:lineItems![key],
                    quantity:items[key] - min
                }
                return acc
            },{})
            const newParcialSend = {
                id:Number(orderId),
                status: isCompleted?'enviado':"envio-parcial",
                meta_data: [
                  {
                    key: "_parcial_send",
                    value: items,
                  },
                  {
                    key: "_parcial_send_history",
                    value: [
                        ...parcialSendHistory,
                        {
                            date:new Date(),
                            items:itemsHistory
                        }
                    ]
                  },
            ],}
            setDialogData({
                status:newParcialSend.status,
                function:()=>updateOrder(newParcialSend)
            })
    };
    return (
    <Dialog isOpen={isOpen && !dialogData} onClose={onClose} closable={true} {...rest}>
        <h4>Enviar pedido #{orderId}</h4>
        <div className='space-y-4 mt-8'>
            {
                products?.map((it)=>{
                    const id = it.variation_id || it.product_id
                    const max = lineItemsMap ? lineItemsMap[id] : 0
                    const min = parcialSendMap[id] || 0 
                    return <div className={`flex items-center ${min === max? "grayscale pointer-events-none opacity-50" :""}`}>
                        {/* <Checkbox/> */}
                        <div className={`w-full ${min === max ? "line-through":""}`}>
                        <ProductColumn row={it}>
                            <span className='!text-xs'>Enviados: {min} de {max}</span>
                        </ProductColumn>
                        </div>
                        <div className='text-2xl flex gap-4 items-center w-24'>
                            <HiArrowCircleLeft className={`cursor-pointer 
                            ${items[id] - min === 0
                                ?'pointer-events-none opacity-50':''
                            }`}  onClick={()=>{
                                setItems((prev) => ({ ...prev, [id]: prev[id]-1 }));
                            }}/>
                                <p className='text-lg'>{items[id]-min}</p>
                            <HiArrowCircleRight className={`cursor-pointer 
                            ${items[id] && items[id] === max
                                ?'pointer-events-none opacity-50':''
                            }`} onClick={()=>{
                                setItems((prev) => ({ ...prev, [id]: prev[id]+1 }));
                            }} />
                        </div>
                    </div>
                })
            }
        </div>
        <div className='flex gap-4 w-full mt-8'>
            <Button onClick={onClose} className='w-full'>
                Atrás
            </Button>
            <Button disabled={isNoDirty} loading={res.isLoading} onClick={handleSend} className='w-full' variant='solid'>
                Aceptar
            </Button>
        </div>
    </Dialog>
  )
}

export default SelectParcialSend