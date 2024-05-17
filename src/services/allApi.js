import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// admin login
export const adminlogin=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/api/Admin/login/`,body,"")
  }

//profile search 
export const profileSearch = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/profile-search/`, { params });
    return response.data; // assuming the response data is the result of the search
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw new Error('Failed to search profiles');
  }
};


export const updateProfile = async (profileId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/profiles/${profileId}`, updatedData);
    return response.data; // Assuming the response data contains the updated profile
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};
export const updateProfileImage = async (profileId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/profileImages/${profileId}`, updatedData);
    return response.data; // Assuming the response data contains the updated profile
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};

export const userrequest = async (body) => {
  return await commonApi("GET", `${BASE_URL}/api/all-users/`, body, "");
};


export const updateUserStatus = async (userId, action) => {
  return await axios.post(`${BASE_URL}/api/profile/Accept-Reject/${userId}/`, { action });
};