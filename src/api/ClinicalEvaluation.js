import api from "../api";

// POST
export async function createEvaluation(data) {
  try {
    const response = await api.post("/initial/", data);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
}

// GET
export async function getEvaluation() {
  try {
    const response = await api.get("/initial/");
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}

// GET single patient
export async function fetchSinglePatient(mrn) {
  try {
    const response = await api.get(`/patient/?mr_no=${mrn}`);
    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}
