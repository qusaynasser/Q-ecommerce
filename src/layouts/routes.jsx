// import Layout from "./Layout.jsx";
// import Register from "../component/web/rigister/Rigister.jsx";
// import Login from "../component/web/login/Login.jsx";
// import Home from "../component/web/home/Home.jsx";
// import Categories from "../component/web/categories/Categories.jsx";
// import DashBoardLayout from "../layouts/DashBordLayout.jsx";
// import HomeDashboard from '../component/dashbord/home/Home.jsx';
// import CategoriesDash from '../component/dashbord/categories/CategoriesDash.jsx';
// import { createBrowserRouter } from "react-router-dom";
// import CategoriesDetalis from "../component/web/categories/CategoriesDetalis.jsx";
// import Product from "../component/web/products/Product.jsx";
// import Cat from "../component/web/cat/Cat.jsx";
// import CatDetalis from "../component/web/cat/CatDetalis.jsx";
// import Cart from "../component/web/cart/Cart.jsx";
// import EnterEmail from "../component/web/login/SendCode.jsx";
// import Newpass from "../component/web/login/Newpass.jsx";

// export const router = createBrowserRouter([
//     {
//     path:'/',
//     element:<Layout />,//user={user} setUser={setUser}
//     children:
//     [
//         {
//             path:'register',
//             element:<Register />
//         },
//         {
//             path:'login',
//             element:<Login  />//saveCurrentUser={saveCurrentUser
//         },
//         {
//             path:'SendCode',
//             element:<EnterEmail/>
//         },
//         {
//             path:'newPassword',
//             element:<Newpass/>
//         },
//         {
//             path:'/',
//             //index:true,
//             element:<Home />
//         },
//         {
//             path:'products/category/:categoryId',
//             element:<CategoriesDetalis/>
//         },
//         {
//             path:'categories',
//             element:<Categories />
//         },
//         {
//             path:'cart',
//             element:<Cart/>
//         },
//         {
//             path:'category-detalis/:catId',
//             element:<CatDetalis/>
//         },
//         {
//             path:'cat',
//             element:<Cat/>
//         },
//         {
//             path:'product/:productId',
//             element:<Product/>
//         },
//         {
//             path:'*',
//             element:<h2>page not found --- web</h2>
//         }
//     ]
//     },
//     {
//         path:'/dashboard',
//         element:<DashBoardLayout />,
//         children:[{
//         path:'home',
//         element:<HomeDashboard />
//     }
//     ,{
//         path:'categories',
//         element:<CategoriesDash />
//     },
//     {
//         path:'*',
//         element:<h2>page not found --- dashboard</h2>
//     }
//     ]
//     }
// ]);