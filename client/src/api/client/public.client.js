import axios from "axios";
import queryString from "query-string";

const baseURL = "https://renewal-morafi-api.vercel.app/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode:params => queryString.stringify(params)
  }
});

publicClient.interceptors.request.use(async config =>  {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json"
    }
  }
});

publicClient.interceptors.response.use((response)=>{
  if(response && response.data) return response.data;
  console.log(response);
  return response;
}, (err) => {
  throw err.response.data;
});

export default publicClient;