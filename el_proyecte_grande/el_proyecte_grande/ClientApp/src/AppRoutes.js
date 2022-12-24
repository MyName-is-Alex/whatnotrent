import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import About from "./components/ProductPage/Test"
import ProductDetails from "./components/ProductPage/ProductDetails";

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
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
