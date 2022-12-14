import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import ProductDetailed from './components/ProductPage/ProductDetailed'

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
    path: '/product-details/:productId/:productName',
    element: <ProductDetailed />,
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
