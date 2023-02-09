import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Home from "./components/Home"; 
import ProductDetails from "./components/ProductPage/ProductDetails";
import AddProduct from "./components/AddProduct/AddProduct";
import EditProfile from "./components/UserPage/EditProfile";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/product-details/:productName',
    element: <ProductDetails />,
    requireAuth: true
  },
  {
    path: '/add-product',
    element: <AddProduct />,
    requireAuth: true
  },
  {
    path: '/update-user',
    element: <EditProfile />,
    requireAuth: true
  },
  ...ApiAuthorizationRoutes
];

export default AppRoutes;
