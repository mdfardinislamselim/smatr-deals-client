import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../pages/AllProducts";
import MyProducts from "../pages/MyProducts";
import MyBids from "../pages/MyBids";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/Register";
import SingIn from "../pages/SingIn";
import PrivateRoute from "../provider/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/latest-products"),
        element: <Home />,
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "product/:id",
        loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProductDetails />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "signin",
        element: <SingIn />,
      },
    ],
  },
]);

export default router;
