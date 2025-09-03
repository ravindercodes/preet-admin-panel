import { dmApi } from '../dmApi';

export const contactApi = dmApi.injectEndpoints({
  endpoints: (build) => ({
    // Send contact message
    sendContactMessage: build.mutation({
      query: (messageData) => ({
        url: '/api/contact',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: messageData,
      }),
    }),

    // Mark contact as read
    markContactAsRead: build.mutation({
      query: (contactId) => ({
        url: `/api/contact/${contactId}/read`,
        method: 'POST',
        headers: {
          'Accept': 'application/ecmascript',
        },
      }),
    }),

    // Get all contact messages
    getContactMessages: build.query({
      query: () => ({
        url: '/api/contact',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),

    // Get unread contact messages
    getUnreadContacts: build.query({
      query: () => ({
        url: '/api/contact/unread',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),

    // Get read contact messages
    getReadContacts: build.query({
      query: () => ({
        url: '/api/contact/read',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useSendContactMessageMutation,
  useMarkContactAsReadMutation,
  useGetContactMessagesQuery,
  useGetUnreadContactsQuery,
  useGetReadContactsQuery,
} = contactApi;


