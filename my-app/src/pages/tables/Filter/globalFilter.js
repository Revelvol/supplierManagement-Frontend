import { useAsyncDebounce } from "react-table";
import { useState } from "react";

//  might wanna look into set aysnc debounce

export const GlobalFilter = ({ filter, setFilter }) => {
  //  only filter after 100 ms after user stop typing
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search : {""}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};
