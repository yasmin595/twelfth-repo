import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: `https://my-twelfth-assignment-server-orcin.vercel.app`
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;