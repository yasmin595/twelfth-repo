import React from 'react';
import Navbar from '../Pages/shared/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../Pages/shared/Loading';
import Footer from '../Pages/shared/Footer';

const RootLayout = () => {
    
      const {state } = useNavigation();
    return (
          <div>
         
         <Navbar></Navbar>
               <div className='max-w-11/12 mx-auto min-h-screen'>
               {state == "loading"? <Loading></Loading> : <Outlet></Outlet> } 
         </div>
            <Footer></Footer>
            
        </div>
    );
};

export default RootLayout;