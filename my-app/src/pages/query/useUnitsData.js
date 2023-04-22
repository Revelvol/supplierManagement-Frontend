import axios from "axios";
import { useQueryClient, useQuery } from "react-query";

const fetchUnitsData = () => {
  return axios.get(
    "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/units/"
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
