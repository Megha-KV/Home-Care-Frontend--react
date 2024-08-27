import api from "../api";

export async function createVital(data) {
  try {
      const response = await api.post("/vitals/", data);
      return response.data;
  } catch (error) {
      console.error("POST Error:", error);
      throw error;
  }
}

// get all vitals
export async function fetchVitals() {
  try {
      const response = await api.get("/vitals/");
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("GET Error:", error);
      throw error;
  }
}

// get vitals of a specific patient
export async function fetchVitalsOfPatient(mrn) {
  try {
      const response = await api.get(`/get-data/?mrn=${mrn}`);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("GET Error:", error);
      throw error;
  }
}
