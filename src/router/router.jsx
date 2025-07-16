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
import ManageRegistered from "../Pages/dashboard/ManageRegistered";
import OrganizerProfile from "../Pages/dashboard/OrganizerProfile";
import Analytics from "../Pages/dashboard/Analytics";
import ParticipantProfile from "../Pages/dashboard/ParticipantProfile";
import FeedbackSection from "../Pages/FeedbackCollection";
import ErrorPage from "../Pages/shared/ErrorPage";
import AdminRoute from "../provider/AdminRoute";
import ParticipantRoute from "../provider/ParticipantRoute";
import UserRoute from "../provider/UserRoute";



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
    },
    {
      path:"/feedback",
      element:<FeedbackSection></FeedbackSection>
    },
       {
      path:'/*',
      element:<ErrorPage></ErrorPage>

        },
         {

        path:"/user/details-camp/:campId",
        element:<UserRoute> <CampDetails></CampDetails></UserRoute>,
        
      
      },
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
        element:<AdminRoute><AddACamp></AddACamp></AdminRoute>,
        
      
      },

      {

        path:'/dashboard/organizer/manage-camps',
        element:<AdminRoute><ManageCamps></ManageCamps></AdminRoute>,
        
      
      },
     {
    path: '/dashboard/organizer/update-camp/:campId',
    element: <AdminRoute><UpdateCamp></UpdateCamp></AdminRoute>,
  },
  
  {
    path: '/dashboard/organizer/manage-registered-camps',
    element:<AdminRoute> <ManageRegistered></ManageRegistered></AdminRoute>,
  },
  {
    path: '/dashboard/organizer/profile',
    element: <AdminRoute><OrganizerProfile></OrganizerProfile></AdminRoute>,
  },


  
      {
        path:"/dashboard/participant/payment-history",
        element:<ParticipantRoute><PaymentHistory></PaymentHistory></ParticipantRoute>,
      }
      ,
      {
        path:"/dashboard/participant/analytics",
        element:<ParticipantRoute><Analytics></Analytics></ParticipantRoute>,
      },
      {
        path:"/dashboard/participant/profile",
        element:<ParticipantRoute><ParticipantProfile></ParticipantProfile></ParticipantRoute>,
      },
      {
        path:"/dashboard/participant/feedback/:id",
        element:<ParticipantRoute><FeedbackForm></FeedbackForm></ParticipantRoute>,
      }
      ,


      {

       path: '/dashboard/participant/registered-camps',
    element: <ParticipantRoute><RegisteredCamps></RegisteredCamps></ParticipantRoute>
  },
  {

path:"/dashboard/payment/:id",
element:<PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>,

  },
     {
      path:'/dashboard/*',
      element:<ErrorPage></ErrorPage>,

        },

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
      },
         {
      path:'/auth/*',
      element:<ErrorPage></ErrorPage>

        },
    ]
  },{
       
      path:'/*',
      element:<ErrorPage></ErrorPage>

        
  }
]);