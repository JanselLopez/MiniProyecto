export type WooUser = {
    id:number
    name:string
}

export type Product = {
    id: number
    price: number
    category: string
    description: string
    regular_price: number
    image: string | { src: string } | null
    rating: {
        rate: number
        count: number
    }
    name: string
    slug: string
    type: string
    status: string
    short_description: string
    sale_price: number
    total_sales: number
    stock_quantity: number | null
    parent_id: number
    categories: {
        id: number
        name: string
        slug: string
    }[]
    images:
        | null
        | {
              id: number
              src: string
          }[]
    attributes: {
        id: number
        name: string
        slug: string
        options: string[]
    }[]
    variations: number[]
    price_html:string
    meta_data:MetaData[]
}

export type College = {
    id: number
    logo: string
    image1: string
    image2: string
    image3: string
    code: string
    name: string
    url: string
    liquidacion: number
    estado: boolean
}

export type SalesInADate = {
    sales: number
    orders: number
    items: number
    tax: number
    shipping: number
    discount: number
    customers: number
}

export type SalesReport = {
    total_sales: number
    net_sales: number
    average_sales: number
    total_orders: number
    total_items: number
    total_tax: number
    total_shipping: number
    total_refunds: number
    total_discount: number
    totals_grouped_by: string
    totals: object
    total_customers: number
}

export type Billing = {
    first_name: number
    last_name: number
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: number
    country: string
    email: string
    phone: number
}

export type LineItem = {
    id: number
    name: string
    product_id: number
    variation_id: number
    quantity: number
    tax_class: string
    subtotal: number
    subtotal_tax: number
    total: number
    total_tax: number
    sku: string
    price: number
    image: {
        id: number
        src: string
    }
    parent_name: number | null
}

type Refund = {
    id: number
    reason: string
    total: string
}

export type RefundMap = {
    [key: number]: {
        quantity: number
        product_id: number
        id: number
        variation_id: number
    }
}

export type MetaData = {
    id:number,
    key:string,
    value:any,
}

export type ParcialSend = {
    date:Date,
    items:{[key:number]:{
        line_item:LineItem
        quantity:number
    }}
}

export type Order = {
    id: number
    parent_id: number
    status: string
    currency: string
    prices_include_tax: boolean
    date_created: string
    date_modified: string
    discount_total: number
    discount_tax: number
    shipping_total: number
    shipping_tax: number
    cart_tax: number
    total: number
    total_tax: number
    customer_id: number
    order_key: string
    billing: Billing
    shipping: Billing
    transaction_id: string
    customer_note: string
    date_completed: string | null
    date_paid: string | null
    cart_hash: string
    number: number
    line_items: LineItem[]
    tax_lines: []
    shipping_lines: []
    fee_lines: []
    coupon_lines: []
    refunds: Refund[]
    payment_url: string
    needs_payment: boolean
    needs_processing: boolean
    currency_symbol: string
    refunds_map: RefundMap
    meta_data:MetaData[]
}

export type Terms = {
    id: number
    // description:string
    name: string
}

// export type Customer = {
//     id: number
//     email: string
//     first_name: string
//     last_name: string
//     username: string
//     meta_data:MetaData[]
// }

export type Category = {
    id: number
    name: string
    slug: string
    parent: number
    description: string
    display: string
    image?: {
        src: string
    }
    menu_order: 0
    count: 1
}

export type Attribute = {
    id: number
    name: string
    slug: string
    type: string
    order_by: string
    has_archives: boolean
}

export type User = {
    id: number
    email: string
    name: string
}

export type Liquidation = {
    colegio_id: number
    total_ventas: number
    liquidacion: number
    pago: number
}

export type Business = {
    id:number
    name:string
    address:string
    phone:string
    dni:string
    logo:string
}

export type Customer = Business & {
    enterprise_id:number
}

export type Enterprise = Business & {
    coin:string
    description:string
}

export type Tax = {
    id:number
    name:string
    enterprise_id:number
    percentage:number
}

export type Bill = {
    client_id: number
    amount: number
    unit_cost: number
    item: string
    correlative_number: string,
    created_at: Date,
    id: number,
    total_price_product: number,
    total_price_bill: number,
    taxes:Tax[]
}
