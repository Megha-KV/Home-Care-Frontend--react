import api from "../api";

// POST
export async function createNote(data) {
    try {
        const response = await api.post("entry/", data);
        return response.data;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
}

// GET
export async function fetchNurseHistory(mrn) {
    try {
      const response = await api.get(`entry/?mrn=${mrn}`);
      return response.data;
    } catch (error) {
      console.error("Get Error:", error);
      throw error;
    }
  }

  export async function fetchSingleNurseHistory(id) {
    try {
      const response = await api.get("one-entry/",{ params: { id } });
      return response.data;
    } catch (error) {
      console.error("Get Error:", error);
      throw error;
    }
  }

  export async function updateNurseNote(data) {
    try {
      const response = await api.patch("entry/", data);
      return response.data;
    } catch (error) {
      console.error("PATCH Error:", error);
      throw error;
    }
  }

  export async function deleteNurseNote(id) {
    try {
      const response = await api.delete(`entry/`,{ data: { id } });
      return response;
    } catch (error) {
      console.error("Delete Error:", error);
      throw error;
    }
  }