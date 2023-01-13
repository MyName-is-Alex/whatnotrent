import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home"; 
import ProductDetails from "./components/ProductPage/ProductDetails";
import AddProductForm from "./components/AddProduct/AddProductForm"

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData  />,
  },
  {
    path: '/product-details/:productName',
    element: <ProductDetails />,
    requireAuth: true
  },
  {
    path: '/add-product',
    element: <AddProductForm />,
    requireAuth: true
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
