import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/person";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notiMessage, setNotiMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const handleNotification = (message, type) => {
    setNotiMessage({
      message,
      type,
    });
    setTimeout(() => setNotiMessage(null), 3000);
  };

  const addName = (e) => {
    e.preventDefault();
    const nameExisted = persons.find((person) => person.name === newName);
    if (nameExisted) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with the new one?`
        )
      ) {
        personService
          .editPerson(nameExisted.id, { name: newName, number: newNumber })
          .then((res) => {
            setPersons((prev) =>
              prev.map((person) => (person.id === res.id ? res : person))
            );
            handleNotification(`Updated ${newName}'s number`, "success");
          });
      }
    } else {
      personService
        .addPerson({ name: newName, number: newNumber })
        .then((res) => {
          setPersons((prev) => [...prev, res]);
          handleNotification(`Added ${newName}`, "success");
        });
    }
    setNewName("");
    setNewNumber("");
  };

  let personsToShow = search
    ? persons.filter((person) =>
        person.name
          .toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      )
    : persons;

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons((prev) => prev.filter((person) => person.id !== id));
          handleNotification(`Deleted ${name}`, "success");
        })
        .catch(() => {
          handleNotification(
            `Information of ${name} has already been removed from server`,
            "error"
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage?.message} type={notiMessage?.type} />
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
