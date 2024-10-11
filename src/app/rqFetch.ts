import { apiCall } from "@/api/sevice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useState, useEffect } from "react";

// Custom hook for fetching data
const rqFetch = (
  queryKey: any,
  apiPayload: [string, string, ...any],
  setrqData?: any
) => {
  const queryClient = useQueryClient();
  const cachedrqData = queryClient.getQueryData(queryKey);
  console.log("LALAN", queryKey, cachedrqData);

  if (cachedrqData) {
    return setrqData({ data: cachedrqData, isLoading: false, isError: false });
  }

  //   const dataApi = async () => {
  //     return await apiCall(...apiPayload);
  //   };

  return setrqData(
    useQuery({
      queryFn: () => apiCall(...apiPayload),
      queryKey,
    })
  );
};

export default rqFetch;
// export function rqFetch(
//   queryKey: any,
//   apiPayload: [string, string, ...any],
//   setrqData?: any
// ) {
//   const queryClient = useQueryClient();
//   const cachedrqData = queryClient.getQueryData(queryKey);
//   console.log("LALAN", queryKey, cachedrqData);

//   if (cachedrqData) {
//     return setrqData({ data: cachedrqData, isLoading: false, isError: false });
//   }

//   //   const dataApi = async () => {
//   //     return await apiCall(...apiPayload);
//   //   };

//   return setrqData(
//     useQuery({
//       queryFn: () => apiCall(...apiPayload),
//       queryKey,
//     })
//   );
// }
