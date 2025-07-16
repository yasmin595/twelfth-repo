import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `my-twelfth-assignment-server-orcin.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;