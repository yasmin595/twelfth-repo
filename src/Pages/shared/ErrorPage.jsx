import React from 'react';

import error from '../../assets/404.gif'

const ErrorPage = () => {

    return (
        <div className='flex flex-col justify-center text-center items-center px-8 md:px-12 mb-4  mx-8 md:mx-12 my-4 rounded-xl border-2 border-gray-300 bg-gray-100 py-4'>
<div> <img className='w-5/12 flex justify-center items-center mx-auto rounded-2xl' src={error} alt="" /></div>
       
        <h2 className="card-title font-bold p-2 text-4xl">No Page is found </h2>
        <p className='text-gray-600 p-6'>Please, select right path  </p>
        </div>
    );
};

export default ErrorPage ;