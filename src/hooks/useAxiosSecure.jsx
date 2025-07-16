// import axios from 'axios';
// import React from 'react';

// const axiosSecure = axios.create({
//     baseURL: `https://my-twelfth-assignment-server-orcin.vercel.app`
// });

// const useAxiosSecure = () => {
//     return axiosSecure;
// };

// export default useAxiosSecure;

import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://twelfth-assignment-86afb.web.app",
    withCredentials: true, 
});

axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;