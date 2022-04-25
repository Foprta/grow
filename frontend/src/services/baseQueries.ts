import {fetchBaseQuery} from "@reduxjs/toolkit/query";

const baseUrl = 'http://localhost:5000'

// export const baseQuery = fetchBaseQuery({
//   baseUrl: `${baseUrl}/api`,
// })


export const securedBaseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/secured`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('JWT');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)

    }

    return headers;

  }
})
