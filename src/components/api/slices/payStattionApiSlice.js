import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../Api";
export const payStationSlice = createApi({
  reducerPath: "payStationPayment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["PaymentPayStation"],
  endpoints: (builder) => ({
    payStationPayment: builder.mutation({
      query: ({ paymentData, token }) => {
        return {
          url: "/api/paymentprocessor/paystation",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: paymentData,
        };
      },
      invalidatesTags: ["PaymentPayStation"],
    }),
  }),
});

export const { usePayStationPaymentMutation } = payStationSlice;
