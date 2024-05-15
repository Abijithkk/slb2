import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// admin login
export const adminlogin=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/api/Admin/login/`,body,"")
  }