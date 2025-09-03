import {showToast} from "./Utils.jsx";
import { toast } from 'react-hot-toast';


export const handleRTKQuery = async (fetchData, onSuccess, onFailure, onComplete) => {
    try {
        const response = await fetchData();
        onSuccess?.(response)
    } catch (error) {
        onFailure?.(error)
    } finally {
        onComplete?.();
    }
}

export const getFormDataAuthorizationHeader = () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        console.warn("No auth token found in localStorage");
        return {};
    }

    return {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        // Note: NO Content-Type header - let browser set it
    };
};

export const getAuthorizationHeader = () => {
    const authToken = localStorage.getItem("authToken");
    console.log("Auth Token:", authToken);

    if (!authToken) {
        console.warn("No auth token found in localStorage");
        return {};
    }

    return {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
};
export const handleQueryError = async (queryFulfilled) => {
    queryFulfilled.catch(error => {
        toast(error?.error?.data?.message || "An error occurred", "error"); // Provide a fallback message
    });
};
export const handleQueryErrorAndSuccess = async (
    queryFulfilled,
    action,
    entityName
) => {
    queryFulfilled.then(() => {
        showToast(`${action} ${entityName} successfully!`, "success");
    }).catch(error => {
        showToast(error?.error?.data?.message || "An error occurred", "error"); // Provide a fallback message
    });
};

