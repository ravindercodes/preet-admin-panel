import { toast } from 'react-hot-toast';
import {dmApi} from "../../app/dmApi";
import {handleQueryErrorAndSuccess} from "../../helpers/RtkQueryUtils";

const authApi = dmApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (request) => ({
                url: "/api/auth/login",
                method: "POST",
                body: request,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                queryFulfilled.then(res => {
                    localStorage.setItem("authToken", res.data.access_token)
                }).catch(error => {
                    toast(error?.error?.data?.message, "error");
                })
            }
        }),
        forgotPassword: build.mutation({
            query: (request) => {
                return {
                    url: `/forgot-password`,
                    method: 'POST',
                    body: request,
                };
            },
            async onQueryStarted(_, {queryFulfilled,}) {
                await handleQueryErrorAndSuccess(queryFulfilled, "", "A password reset email has been sent to the specified email address, if there is a user associated with it")
            },
        }),
    })
})
export const {
    useLoginUserMutation,
    useForgotPasswordMutation
} = authApi;