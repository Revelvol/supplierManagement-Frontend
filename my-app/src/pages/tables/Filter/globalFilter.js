import { useAsyncDebounce } from "react-table";
import { useState } from "react";

//  might wanna look into set aysnc debounce 

export const GlobalFilter = ({ filter, setFilter }) => {

  //  only filter after 100 ms after user stop typing
/*   const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 100);
 */
  return (
    <span>
      Search : {""}
      <input
        value={filter || ""}
        onChange={(e) => {
          setFilter(e.target.value)
        }}
      />
    </span>
  );
};
