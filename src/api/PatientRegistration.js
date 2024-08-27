import api from "../api";
export async function createPatient(data) {
  try {
      const response = await api.post("/patient/", data);
      return response.data;
  } catch (error) {
      console.error("POST Error:", error);
      throw error;
  }
}

// export async function getPatients() {
//   try {
//       const response = await api.get("/patient-data");
//       return response.data;
//   } catch (error) {
//       console.error("GET Error:", error);
//       throw error;
//   }
// }

export async function getPatients() {
  try {
      const response = await api.get("patient/");
      return response.data;
  } catch (error) {
      console.error("GET Error:", error);
      throw error;
  }

}

