import api from "../api";

// get all scheduled patients for a specific nurse
export async function fetchPatientForNurse(id) {
  try {
    const response = await api.get(`/appointment/?nurse_id=${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}

export async function fetchFilteredPatientsOfNurse(searchDate) {
  try {
    const response = await api.get(`/appointment/?start_date=${searchDate}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered patients:", error);
    throw new Error("Failed to fetch filtered patients");
  }
}
