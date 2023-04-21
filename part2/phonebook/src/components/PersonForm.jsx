const PersonForm = ({
  addName,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{" "}
        <input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          required
        />
      </div>
      <div>
        number:{" "}
        <input
          onChange={(e) => setNewNumber(e.target.value)}
          value={newNumber}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
