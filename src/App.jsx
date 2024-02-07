import { RouterProvider} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Register from "./component/web/rigister/Rigister.jsx";
import Login from "./component/web/login/Login.jsx";
import Home from "./component/web/home/Home.jsx";
import Categories from "./component/web/categories/Categories.jsx";
import DashBoardLayout from "./layouts/DashBordLayout.jsx";
import HomeDashboard from './component/dashbord/home/Home.jsx';
import CategoriesDash from './component/dashbord/categories/CategoriesDash.jsx';
import { createBrowserRouter } from "react-router-dom";
import CategoriesDetalis from "./component/web/categories/CategoriesDetalis.jsx";
import Product from "./component/web/products/Product.jsx";
import { CartContextProvider } from "./component/web/context/Cart.jsx";
import Cart from "./component/web/cart/Cart.jsx";
import EnterEmail from "./component/web/login/SendCode.jsx";
import Newpass from "./component/web/login/Newpass.jsx";
import { UserContext} from "./component/web/context/User.jsx";
import Profail from "./component/web/profail/Profail.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import { useContext, useEffect } from "react";
import Auth from "./protectedRoute/Auth.jsx";
import UserInfo from "./component/web/profail/UserInfo.jsx";
import UserContact from "./component/web/profail/UserContact.jsx";
import CreateOrder from "./component/web/orders/CreateOreder.jsx";
import OrderDetail from "./component/web/orders/OrderDetail.jsx";
import Pagenation from "./component/web/products/Pagenation.jsx";
import AllProducts from "./component/web/products/AllProducts.jsx";
import Rating from "./component/web/products/Rating.jsx";

export default function App() {
  let {setUserToken}=useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken"))
    {
        setUserToken(localStorage.getItem("userToken"));
    }
},[])
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
          {
            path:'register',
            element:<Register />
          },
          {
            path:'login',
            element:
            <Auth>
            <Login  />
            </Auth>
          },
          {
            path:'SendCode',
            element:<EnterEmail/>
          },
          {
            path:'newPassword',
            element:<Newpass/>
          },
          {
            path:'profile',
            element:
            <ProtectedRoute>
            <Profail/>
            </ProtectedRoute>,
            children:[
              {
                index:true, //يعني اول ما يفتح المستخدم على بروفايل تظهر مباشرة
                element:<UserInfo/>
              },
              {
                path:'contact',
                element:<UserContact/>
              },
              {
                path:"orderDetails",
                element:<OrderDetail/>
              }
            ]
          },
          {
            path:'/',
            //index:true,
            element:<Home />
          },
          {
            path:'categories',
            element:<Categories />
          },
          {
            path:'products',
            element:<Pagenation/>
          },
          {
            path:'allProducts',
            element:<AllProducts/>
          },
          {
            path:'cart',
            element:
            <ProtectedRoute>
            <Cart/>
            </ProtectedRoute>
          },
          {
            path:'rating/:ratingId',
            element:<Rating/>
          },
          {
            path:'createOrder',
            element:<CreateOrder/>
          },
          {
            path:'products/category/:categoryId',
            element:<CategoriesDetalis/>
          },
          {
            path:'product/:productId',
            element:<Product/>
          },
          {
            path:'*',
            element:<h2>page not found --- web</h2>
          }
          
      ]
    },
    {
        path:'/dashboard',
        element:<DashBoardLayout />,
        children:[
        {
        path:'home',
        element:<HomeDashboard />
        }
      ,{
        path:'categories',
        element:<CategoriesDash />
      },
      {
        path:'*',
        element:<h2>page not found --- dashboard</h2>
      }
    ]
    }
  ]);
  return (
    <CartContextProvider>
    <RouterProvider router={router} />
    </CartContextProvider>
  )
}
