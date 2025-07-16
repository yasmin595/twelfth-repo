import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://twelfth-assignment-86afb.web.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;