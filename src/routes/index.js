/*public */
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';
import Stores from '../pages/Store';
import Checkout from '../pages/Checkout';
import Unauthorized from '../pages/Unauthorized';
import SearchResult from '../pages/SearchResult';
import Menu from '../pages/Menu';
import About from '../pages/About';
import Contact from '../pages/Contact';
import News from '../pages/News';

/*user */
import Personal from '../pages/Personal';

/*admin */
import Dashboard from '../pages/Admin/Dashboard';
import Product from '../components/Table/Product';
import Category from '../components/Table/Category';
import Store from '../components/Table/Store';
import Employee from '../components/Table/Employee';
import CreateOrUpdateProduct from '../components/Form/Product';
import CreateOrUpdateCategory from '../components/Form/Category';
import CreateOrUpdateStore from '../components/Form/Store';
import CreateOrUpdateEmployee from '../components/Form/Employee';

/*store employee */
import ManageOrders from '../pages/Employee/ManageOrders';
import Invoice from '../pages/Employee/Invoice';
import { default as EmployeeDashboard } from '../pages/Employee/Dashboard';

export const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/auth',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/products/:id',
    component: ProductDetail,
  },
  {
    path: '/stores/',
    component: Stores,
  },
  {
    path: '/menu/:id',
    component: Menu,
  },
  {
    path: '/checkout/',
    component: Checkout,
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
  },
  {
    path: '/search',
    component: SearchResult,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/news',
    component: News,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
];

//Required login
export const userRoutes = [
  {
    path: '/personal',
    component: Personal,
  },
];
export const adminRoutes = [
  {
    path: '/admin',
    component: Dashboard,
  },

  {
    path: '/admin/products',
    component: Product,
  },
  {
    path: '/admin/products/:id',
    component: CreateOrUpdateProduct,
  },

  {
    path: '/admin/categories',
    component: Category,
  },
  {
    path: '/admin/categories/:id',
    component: CreateOrUpdateCategory,
  },

  {
    path: '/admin/stores',
    component: Store,
  },
  {
    path: '/admin/stores/:id',
    component: CreateOrUpdateStore,
  },

  {
    path: '/admin/employees',
    component: Employee,
  },
  {
    path: '/admin/employees/:id',
    component: CreateOrUpdateEmployee,
  },
];
export const employeeRoutes = [
  {
    path: '/employee',
    component: EmployeeDashboard,
  },
  {
    path: '/employee/orders',
    component: ManageOrders,
  },
  {
    path: '/employee/order/:id',
    component: Invoice,
  },
];
