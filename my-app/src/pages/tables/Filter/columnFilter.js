export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search : {""}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
 

export const isUsedFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Show: {""}
      <select
        value={filterValue}
        onChange={(e) => {
          const val = e.target.value;
          setFilter(val);
        }}
      >
        <option value="">All</option>
        <option value="true">Used</option>
        <option value="false">Not Used</option>
      </select>
    </span>
  );
};
