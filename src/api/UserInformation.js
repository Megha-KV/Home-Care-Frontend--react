import api from "../api";
import { ACCESS_TOKEN } from "../constants";

export async function createUser(data) {
  try {
    const response = await api.post("/userrecord/", data);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
}

// get all registered users
export async function fetchUsers() {
  try {
    const response = await api.get("/userrecord/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}

export async function updateUser(data) {
  try {
    const response = await api.patch("/userrecord/", data);
    return response.data;
  } catch (error) {
    console.error("PATCH Error:", error);
    throw error;
  }
}

export async function deleteUser(data) {
  try {
    const response = await api.delete("/userrecord/", { data });
    return response.data;
  } catch (error) {
    console.error("delete Error:", error);
    throw error;
  }
}
