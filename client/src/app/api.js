import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

export const api = createApi({
    reducerPath:"adminApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5001"}),
    tagTypes:["User"],
    endpoints: (builder)=>({
        getUser:builder.query({
            query:(id)=>`general/user/${id}`,
            providesTags:["User"]
        })
    })
})
export const {
    useGetUserQuery
} =api
