import axios from "axios";
// const baseUrl = "http://localhost:3001/persons"; // old ex 2 json server endpoint
// const baseUrl = "http://localhost:3001/api/persons"; // ex 3 node endpoint
const baseUrl = "/api/persons"; // ex 3 relative path
const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((res) => res.data);
};
const deletePerson = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response;
};
const addPerson = (newObj) => {
  const response = axios.post(baseUrl, newObj);
  return response.then((res) => res.data);
};
const editPerson = (id, newObj) => {
  const response = axios.put(`${baseUrl}/${id}`, newObj);
  return response.then((res) => res.data);
};

export default { getAll, deletePerson, addPerson, editPerson };
