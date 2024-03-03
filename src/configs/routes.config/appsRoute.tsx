import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
    {
        key: 'customers',
        path: `/customers`,
        component: lazy(() => import('@/views/customers/Customers')),
        authority: [ADMIN, USER],
    },
    {
        key: 'customers.create',
        path: `/customers/create`,
        component: lazy(() => import('@/views/customers/CustomerCreate')),
        authority: [ADMIN, USER],
    },
    {
        key: 'customers.edit',
        path: `/customers/edit`,
        component: lazy(() => import('@/views/customers/CustomerEdit')),
        authority: [ADMIN, USER],
    },
    {
        key: 'enterprises',
        path: `/enterprises`,
        component: lazy(() => import('@/views/enterprises/Enterprises')),
        authority: [],
    },
    {
        key: 'enterprises.create',
        path: `/enterprises/create`,
        component: lazy(() => import('@/views/enterprises/EnterpriseCreate')),
        authority: [],
    },
    {
        key: 'enterprises.edit',
        path: `/enterprises/edit`,
        component: lazy(() => import('@/views/enterprises/EnterpriseEdit')),
        authority: [],
    },
    {
        key: 'enterprises.edit',
        path: `/enterprises/edit`,
        component: lazy(() => import('@/views/enterprises/EnterpriseEdit')),
        authority: [],
    },
    {
        key: 'taxes.create',
        path: `/enterprises/edit/create`,
        component: lazy(() => import('@/views/taxes/TaxCreate')),
        authority: [],
    },
    {
        key: 'taxes.edit',
        path: `/enterprises/edit/edit`,
        component: lazy(() => import('@/views/taxes/TaxUpdate')),
        authority: [],
    },
    {
        key: 'bills',
        path: `/bills`,
        component: lazy(() => import('@/views/bills/Bills')),
        authority: [],
    },
    {
        key: 'bills',
        path: `/bills/create`,
        component: lazy(() => import('@/views/bills/BillCreate')),
        authority: [],
    },
]

export default appsRoute
