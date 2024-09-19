import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../Api";

export const groupsApiSlice = createApi({
  reducerPath: "communityGroup",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["communityGroup"],
  endpoints: (builder) => ({
    getGroupData: builder.query({
      query: ({token,microsite_id,currentPage,searchValue}) => {
        return {
          url: `/api/community/groups?microsite_id=${microsite_id}&current_page=${currentPage}&keyword=${searchValue}`,
          method: "GET",
          headers:{
            Authorization: `Bearer ${token}`
          }
        };
      },
      providesTags: ["communityGroup"],
    }),
    getSingleGroupData: builder.query({
      query: ({token,uuid}) => {
        if(token && uuid){
          return {
            url: `/api/community/groups/${uuid}`,
            method: "GET",
            headers:{
              Authorization: `Bearer ${token}`
            }
          };
        }
      },
      providesTags: ["communityGroup"],
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
      invalidatesTags: ['communityGroup'],
    }),
    deleteGroup: builder.mutation({
      query: ({token,uuid}) => ({
        url: `/api/community/groups/${uuid}`,
        method: 'DELETE',
        headers:{
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['communityGroup'],
    }),

    getGroupMemberData: builder.query({
      query: ({token,groupId,userId,type}) => {
        return {
          url: `/api/community/groupmembers?group_id=${groupId}&user_id=${userId}&type=${type}`,
          method: "GET",
          headers:{
            Authorization: `Bearer ${token}`
          }
        };
      },
      providesTags: ["communityGroup"],
    }),
    storeGroupMember: builder.mutation({
      query: ({token,formData,url}) => ({
        url: url,
        method: 'POST',
        body: formData,
        headers:{
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['communityGroup'],
    }),
    deleteGroupMember: builder.mutation({
      query: ({token,uuid}) => ({
        url: `/api/community/groupmembers/${uuid}`,
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

  useGetGroupMemberDataQuery,
  useStoreGroupMemberMutation,
  useDeleteGroupMemberMutation

  } = groupsApiSlice;