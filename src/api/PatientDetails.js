import api from "../api";

export async function getSinglePatient(mr_no) {
  try {
    const response = await api.get(`patient/?mr_no=${mr_no}`); // Modified URL to include query parameter
    return response.data;
  } catch (error) {
    console.error("GET Error in get single patient:", error);
    throw error;
  }
}
export async function updatePatient(data) {
    try {
      const response = await api.patch("/patient/", data);
      return response.data;
    } catch (error) {
      console.error("PATCH Error:", error);
      throw error;
    }
  }
  
  export async function deletePatient(data) {
    try {
      const response = await api.delete("/patient/", { data });
      return response.data;
    } catch (error) {
      console.error("delete Error:", error);
      throw error;
    }
  }