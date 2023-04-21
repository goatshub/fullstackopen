const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person, i) => (
        <div key={person.name + i}>
          <span>{`${person.name} ${person?.number} `}</span>
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default Persons;
