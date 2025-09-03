import { dmApi } from '../dmApi';

export const authApi = dmApi.injectEndpoints({
  endpoints: (build) => ({
    // Register new user
    register: build.mutation({
      query: (credentials) => ({
        url: '/api/auth/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),

    // Login user
    login: build.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: credentials,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi;


