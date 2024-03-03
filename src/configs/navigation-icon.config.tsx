import {
    HiOutlineUserGroup,
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineAcademicCap,
    HiOutlineCollection,
    HiOutlineShoppingCart,
    HiOutlineTruck,
    HiOutlineUsers,
    HiOutlineCurrencyEuro,
    HiOutlineDocumentText,
    HiOutlineChartBar,
    HiOutlineOfficeBuilding,
    HiOutlineTicket,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    users: <HiOutlineUsers />,
    customers: <HiOutlineUserGroup />,
    enterprises:<HiOutlineOfficeBuilding/>,
    bills:<HiOutlineTicket/>,
}

export default navigationIcon
