const FilterCountries = ({ onChange, value }) => {
  return (
    <div>
      <span>Find countries: </span>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};
export default FilterCountries;
