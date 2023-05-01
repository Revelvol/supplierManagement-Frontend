import axios from "axios";
import { useQueryClient, useQuery } from "react-query";

const fetchUnitsData = () => {
  return axios.get(
    "https://www.revelvolsuppliermanagement.online/api/units/"
  );
};


export const useGetUnitsData = () => {
    /* React Query Hook to fetch units Data  */
  const queryClient = useQueryClient();
  const queryKey = "units"
  const queryFn = fetchUnitsData
  return useQuery(queryKey, queryFn, {
    initialData: () =>{
      const unit = queryClient.getQueryData("units")
      if(unit){
        return {
          data:unit
        }
      }
      
    }
  });
};
