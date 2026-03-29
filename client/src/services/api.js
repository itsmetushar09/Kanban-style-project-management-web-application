import axios from "axios";

const API = axios.create({
  baseURL: "https://kanban-style-project-management-web-tqrg.onrender.com/api/boards",
});

export default API;