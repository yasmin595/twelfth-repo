import {
  createBrowserRouter,

} from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home";
import LogIn from "../Pages/Authentication/LogIn";
import Register from "../Pages/Authentication/Register";
import PrivateRoute from "../provider/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddACamp from "../Pages/dashboard/AddACamp";
import ManageCamps from "../Pages/dashboard/ManageCamps";
import UpdateCamp from "../Pages/dashboard/UpdateCamp";
import AvailablePage from "../Pages/AvailableCamp";
import CampDetails from "../Pages/dashboard/CampDetails";
import RegisteredCamps from "../Pages/dashboard/RegisterCamp";
import PaymentPage from "../Pages/dashboard/PaymentPage";
import PaymentHistory from "../Pages/dashboard/PaymentHistory";
import FeedbackForm from "../Pages/dashboard/FeedbackForm";



export     const router = createBrowserRouter([
  {
     path: "/",
    element: <RootLayout></RootLayout>,
    children:[
    {
        index:true,
        element:<Home></Home>
    },
    {
      path:"/available-camps",
      element:<AvailablePage></AvailablePage>,
    }
    ]
  },

  {
      path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {

        path:'/dashboard/organizer/add-camp',
        element:<AddACamp></AddACamp>,
        
      
      },

      {

        path:'/dashboard/organizer/manage-camps',
        element:<ManageCamps></ManageCamps>,
        
      
      },
     {
    path: '/dashboard/organizer/update-camp/:campId',
    element: <UpdateCamp></UpdateCamp>
  },
   {

        path:"/dashboard/user/details-camp/:campId",
        element:<PrivateRoute>
          <CampDetails></CampDetails>
        </PrivateRoute>,
        
      
      },
      {
        path:"/dashboard/participant/payment-history",
        element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      }
      ,
      {
        path:"/dashboard/participant/feedback/:id",
        element:<PrivateRoute><FeedbackForm></FeedbackForm></PrivateRoute>
      }
      ,


      {

       path: '/dashboard/participant/registered-camps',
    element: <RegisteredCamps></RegisteredCamps>
  },
  {

path:"/dashboard/payment/:id",
element:<PaymentPage></PaymentPage>,

  }

    ]
  },


  {
    path:"/auth",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:"/auth/login",
        element:<LogIn></LogIn>
      },
      {
        path:"/auth/register",
        element:<Register></Register>,
      }
    ]
  }
]);