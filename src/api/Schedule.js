import api from "../api";

// Function to fetch patients from the backend API
export async function getPatients() {
  try {
    // Making a GET request to the API endpoint
    const response = await api.get("/patient-data/");
 
    // Returning the data received from the API
    return response.data;
  } catch (error) {
    // Handling errors if the request fails
    console.error("GET Error:", error);
    throw error;
  }
}

// Function to schedule a nurse appointment
export async function nurseSchedule(data) {
  try {
    // Making a POST request to the API endpoint to schedule the appointment
    const response = await api.post("/nurseschedule/", data);

    // Returning the response data
    return response.data;
  } catch (error) {
    // Handling errors if the request fails
    console.error("POST Error:", error);
    throw error;
  }
}

// Function to schedule a doctor appointment
export async function doctorSchedule(data) {
  try {
    // Making a POST request to the API endpoint to schedule the appointment
    const response = await api.post("/doctorschedule/", data);

    // Returning the response data
    return response.data;
  } catch (error) {
    // Handling errors if the request fails
    console.error("POST Error:", error);
    throw error;
  }
}

// Function to check nurse appointment conflicts
export async function nurseConflict(data) {
  try {
    // Making a POST request to the API endpoint to check conflicts
    const response = await api.post("/nurseconflict/", data);

    // Returning the response data
    return response.data;
  } catch (error) {
    // Handling errors if the request fails
    console.error("POST Error:", error);
    throw error;
  }
}

// Function to check doctor appointment conflicts
export async function doctorConflict(data) {
  try {
    // Making a POST request to the API endpoint to check conflicts
    const response = await api.post("/doctorconflict/", data);

    // Returning the response data
    return response.data;
  } catch (error) {
    // Handling errors if the request fails
    console.error("POST Error:", error);
    throw error;
  }
}
