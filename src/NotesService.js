import axios from "axios";

const API_URL = "http://localhost:3000/api";

export default class NotesService {
  static async getNotes() {
    return axios.get(`${API_URL}/notes`);
  }

  static async createNote(note) {
    return axios.post(`${API_URL}/notes`, note);
  }

  static async updateNote(id, note) {
    return axios.put(`${API_URL}/notes/${id}`, note);
  }

  static async deleteNote(id) {
    return axios.delete(`${API_URL}/notes/${id}`);
  }
}
