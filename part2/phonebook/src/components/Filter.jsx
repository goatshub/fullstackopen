const Filter = ({ search, setSearch }) => {
  return (
    <div>
      Filter shown with{" "}
      <input onChange={(e) => setSearch(e.target.value)} value={search} />
    </div>
  );
};
export default Filter;
