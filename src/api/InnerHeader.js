import api from "../api";

export async function fetchHeader() {
  try {
    const response = await api.get("/appointment/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}

export async function fetchPatientDetails(mr_no) {
  try {
    const response = await api.get(`/patient/?mr_no=${mr_no}`);
    return response.data; // Assuming the response contains the patient details
  } catch (error) {
    console.error("Error fetching patient details:", error);
    throw error;
  }
}
