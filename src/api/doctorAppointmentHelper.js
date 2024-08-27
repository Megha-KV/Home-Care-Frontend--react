import api from "../api";

// get all scheduled patients for a specific doctor
export async function fetchPatientForDoctor(id) {
  try {
    const response = await api.get(`/doctorappointment/?doctor_id=${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}


// get filtered patients by searchDate
export async function fetchFilteredPatients(searchDate) {
  try {
    const response = await api.get(
      `/doctorappointment/?start_date=${searchDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw new Error("Failed to fetch filtered patients");
  }
}
