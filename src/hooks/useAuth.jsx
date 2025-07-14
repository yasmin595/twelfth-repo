import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
// import { AuthContext } from '../contexts/AuthContext/AuthContext';

const useAuth = () => {
    const authData = use(AuthContext);
    return authData;
};

export default useAuth;