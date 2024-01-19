import "./App.css"
import {  createBrowserRouter,  RouterProvider, Outlet} from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Admin from "./pages/Admin/Admin";
import ViewUsers from "./pages/ViewUsers/ViewUsers";
import User from "./pages/User/User";

const App = () => {
  const Layout=()=>{
    return (
      <div className="app">  
        <div className="appContainer">
          <Outlet/>
        </div>
      </div>
    )
  }
  const isAdmin = localStorage.getItem("isAdmin")
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {  
          path: "/",
          element: <Login/>
        },
        {
          path: "/ad",
          element: isAdmin && 1 ? <Admin/> : <Login isAdmin={true}/>
        },
        {
          path: "/user",
          element: <User/>
        },
        {
          path: "/viewUsers",
          element: isAdmin ? <ViewUsers/> : <User/>
        },
        {
          path: "/admin",
          element: <Login isAdmin={true}/>
        },
        {
          path: "*",
          element: <NotFound/>
        },
      ]
    },
  ]);
  return (
      <RouterProvider router={router} />
  )
}

export default App