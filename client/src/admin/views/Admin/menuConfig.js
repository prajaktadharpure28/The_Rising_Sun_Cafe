// menu config
import AddProductImg from './images/add_product.png'
import ViewProductImg from './images/product_list.png'
import AddTableImg from './images/table.png'
import ViewTableImg from './images/table_list.png'
import ViewOrderImg from './images/order.png'
 
const menuList = [
    {
        title: 'Add Product',
        icon: AddProductImg,
        path: '/admin/addProduct',
    },
    {
        title: 'View Products',
        icon: ViewProductImg,
        path: '/admin/viewProducts',
    },
    {
        title: 'Add Table',
        icon: AddTableImg,
        path: '/admin/addTable',
    },
    {
        title: 'View Tables',
        icon: ViewTableImg,
        path: '/admin/viewTables',
    },
    {
        title: 'View Orders',
        icon: ViewOrderImg,
        path: '/admin/viewOrders',
    }
];

export default menuList;
        