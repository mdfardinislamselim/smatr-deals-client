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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "my-bids",
        element: <MyBids />,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
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
