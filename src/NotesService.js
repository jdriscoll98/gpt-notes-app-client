import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export default class NotesService {
  static async getNotes() {
    return axios.get(`${API_URL}/notes`);
  }

  static async createNote(note) {
    try {
      const response = await axios.post(`${API_URL}/notes`, note, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateNote(id, note) {
    try {
      const response = await axios.put(`${API_URL}/notes/${id}`, note, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await axios.delete(`${API_URL}/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
