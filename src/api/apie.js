// import { BASE_URL } from "../Global";
// import axios from "axios";
//post
// export async function createTextAreas(data) {
//   try {
//     const response = await axios.post(`${BASE_URL}/apie/`, data);
//     return response.data;
//   } catch (error) {
//     console.error("POST Error:", error);
//     throw error;
//   }
// }

import api from "../api";

export async function createTextAreas(data) {
  try {
    const response = await api.post("apie/", data);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
}

// GET
export async function fetchHistory(mrn) {
  try {
    const response = await api.get(`apie/?mrn=${mrn}`);
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}

//fetch single history
export async function fetchSingleHistory(id) {
  try {
    const response = await api.get("one-apie/", { params: { id } });
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}


//PATCH
export async function updateNote(data) {
  try {
    const response = await api.patch("apie/", data);
    return response.data;
  } catch (error) {
    console.error("PATCH Error:", error);
    throw error;
  }
}

export async function deleteNote(data) {
  try {
    const response = await api.delete("apie/",data);
    return response;
  } catch (error) {
    console.error("Delete Error:", error);
    throw error;
  }
}
