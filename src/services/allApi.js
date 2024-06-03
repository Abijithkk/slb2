import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// admin login
export const adminlogin=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/api/adminlogin/`,body,"")
  }

//profile search 
export const profileSearch = async (params) => {
  try {
    console.log('Search Parameters:', params); // Log the parameters being sent
    const response = await axios.get(`${BASE_URL}/api/employees/search/`, { params });
    console.log('API Response:', response.data); // Log the full response
    return response.data; // Ensure this is the correct path to the data
  } catch (error) {
    console.error('Error searching profiles:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Failed to search profiles');
  }
};

export const getProfile = async (userId) => {
  try {
    const response = await commonApi("GET", `${BASE_URL}/api/employees/${userId}/`, {}, "");
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile data');
  }
};

export const updateProfile = async (profileId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/employees/${profileId}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};

export const updateProfileImage = async (profileId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/employees/${profileId}/update-photo/`, formData, {
      // Optional configuration for handling file uploads (if applicable)
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // Assuming the response data contains the updated profile
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};

export const userrequest = async (body) => {
  return await commonApi("GET", `${BASE_URL}/api/employees/`, body, "");
};


export const updateUserStatus = async (userId, action) => {
  return await axios.put(`${BASE_URL}/api/employees/${userId}/accept-reject/`, { action });
};
// approved users
export const removeUser = async (body) => {
  return await commonApi("GET", `${BASE_URL}/api/employees-accepted/`, body, "");
};


// romve employee
export const deleteUser = async (id) => {
  try {
      const response = await commonApi("DELETE", `${BASE_URL}/api/employees/${id}/`, null, "");
      console.log("Delete response:", response); // Log the response
      return response;
  } catch (error) {
      console.error("Error in deleteUser:", error); // Log the error
      throw error;
  }
};


export const approvedusers = async (body) => {
  return await commonApi("GET", `${BASE_URL}/api/employees-accepted/`, body, "");
};

// toggle 
export const toggleDuty = async (id, newState) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/employees/${id}/toggle-duty/`, { onDuty: newState });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// notifications
export const fetchNotifications = async () => {
  const response = await fetch(`${BASE_URL}/api/notifications/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const deleteNotification = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/del-notifications/${id}/`);
  } catch (error) {
    throw error;
  }
};


export async function toggleDutyStatus(userId, onDuty) {
  try {
    const response = await fetch(`${BASE_URL}/api/employees/${userId}/toggle-duty/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ on_duty: onDuty }),
    });
    if (!response.ok) {
      throw new Error("Failed to toggle duty status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error toggling duty status:", error);
    throw error;
  }
}
export async function getViewMainTrainings() {
  try {
    const response = await fetch(`${BASE_URL}/api/view-main-trainings/`);
    if (!response.ok) {
      throw new Error("Failed to fetch training data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching training data:", error);
    throw error;
  }
}
export const getOverallTrainingOTC = async (employeeId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/employees/${employeeId}/average-completion-percentage/`);
    if (!response.ok) {
      throw new Error("Failed to fetch overall training OTC");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching overall training OTC:", error);
    throw error; 
  }
};