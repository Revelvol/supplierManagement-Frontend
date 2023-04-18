import axios from "axios";
import { useQueryClient, useQuery } from "react-query";

const fetchFunctionsData = () => {
  return axios.get(
    "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/functions/"
  );
};

export const useGetFunctionsData = () => {
  /* React Query Hook to fetch functions Data  */
  const queryClient = useQueryClient();
  const queryKey = "functions";
  const queryFn = fetchFunctionsData;
  return useQuery(queryKey, queryFn, {
    initialData: () => {
      const functionData = queryClient.getQueryData(queryKey);
      if (functionData) {
        return { data: functionData };
      }
    },
  });
};
