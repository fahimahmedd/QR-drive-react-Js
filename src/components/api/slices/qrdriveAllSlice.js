import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../Api";

export const qrdriveAllSlice = createApi({
  reducerPath: "qrdriveAll",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["qrdriveAll"],
  endpoints: (builder) => ({
    getGroupData: builder.query({
      query: ({token}) => {
        return {
          url: `/api/qrdrive/all`,
          method: "GET",
          headers:{
            Authorization: `Bearer ${token}`
          }
        };
      },
      providesTags: ["qrdriveAll"],
    }),
    getSingleGroupData: builder.query({
      query: ({token,uuid}) => {
        if(token && uuid){
          return {
            url: `/api/qrdrive/all/${uuid}`,
            method: "GET",
            headers:{
              Authorization: `Bearer ${token}`
            }
          };
        }
      },
      providesTags: ["qrdriveAll"],
    }),
    storeGroup: builder.mutation({
      query: ({token,formData,url}) => ({
        url: url,
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['qrdriveAll'],
    }),
    deleteGroup: builder.mutation({
      query: ({token,uuid}) => ({
        url: `/api/qrdrive/all/${uuid}`,
        method: 'DELETE',
        headers:{
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['communityGroup'],
    }),
  }),
});

export const {
  useGetGroupDataQuery,
  useDeleteGroupMutation,
  useStoreGroupMutation,
  useGetSingleGroupDataQuery,
  } = qrdriveAllSlice;