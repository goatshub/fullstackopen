import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
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
