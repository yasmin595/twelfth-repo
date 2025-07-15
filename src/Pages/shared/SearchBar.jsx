
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by camp name, date or doctor..."
        className="input input-bordered w-full max-w-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
