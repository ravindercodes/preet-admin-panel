import { toast } from 'react-hot-toast';

export const isNullOrEmpty = (data) => {
    return (
        data === null ||
        data === undefined ||
        data === '' ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === 'object' && Object?.keys(data).length === 0)
    );
};

// export const showToast = (message = '', type = 'info') => {
//     if (isNullOrEmpty(message) || isNullOrEmpty(type) || !type) {
//         return;
//     }
//
//     toast(message, { type, toastId: message });
// };

export const showToast = (message = '', type = 'info') => {
    console.log("comes here ")
    if (!message || !type) {
        return;
    }
    toast(message, {
        type: type,
        id: message,
    });
};



export function serialize(obj) {
    let str = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (Array.isArray(obj[p])) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p].join(',')));
            } else {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
    }
    return str.join("&");
}

export const createOptionListForSelectTag = (data = null, label = "", value = "", suffix = "", overrideLabel = "") => {
    let list = [];

    if (isNullOrEmpty(data) || isNullOrEmpty(label) || isNullOrEmpty(value)) {
        return list;
    }

    if (!Array.isArray(data)) {
        return list;
    }

    list = data?.map(cur => {
        const labelText =
            (isNullOrEmpty(overrideLabel) || isNullOrEmpty(cur[overrideLabel]))
                ? cur[label]
                : cur[overrideLabel];

        return {
            value: cur[value],
            label: labelText + (isNullOrEmpty(suffix) ? "" : " (" + cur[suffix] + ")"),
        };
    });

    return list;
};


export const validatePassword = (password, confirmPassword) => {
    const regexForUppercase = new RegExp("(?=.*[A-Z])");
    const regexForLowercase = new RegExp("(?=.*[a-z])");
    const regexForNum = new RegExp(/\d/);
    const regexForSpecialChar = new RegExp("(?=.*\\W)");
    const regexForLength = new RegExp(/^.{12,50}$/);

    let error = {
        isValidSubmission: false,
    };

    if (!regexForUppercase.test(password)) {
        error.uppercaseChar = "Must contain at least one uppercase letter (A - Z)";
    } else {
        error.uppercaseCheck = "true";
    }

    if (!regexForLowercase.test(password)) {
        error.lowercaseChar = "Must contain at least one lowercase letter (a - z)";
    } else {
        error.lowercaseCheck = "true";
    }

    if (!regexForNum.test(password)) {
        error.number = "Must contain at least one number (0 - 9)";
    } else {
        error.numberCheck = "true";
    }

    if (!regexForSpecialChar.test(password)) {
        error.specialChar = "Must contain at least one special character (e.g. !, #, $, %)";
    } else {
        error.specialCharCheck = "true";
    }

    if (!regexForLength.test(password)) {
        error.length = "Must contain between 12 and 50 characters";
    } else {
        error.lengthCheck = "true";
    }

    if (password !== confirmPassword && confirmPassword !== null && confirmPassword !== "") {
        error.match = "Password and Confirm Password don't match!";
    } else {
        error.match = "";
    }

    error.isValidSubmission =
        regexForUppercase.test(password) &&
        regexForLowercase.test(password) &&
        regexForNum.test(password) &&
        regexForSpecialChar.test(password) &&
        regexForLength.test(password);

    if (error.isValidSubmission) {
        delete error.uppercaseChar;
        delete error.lowercaseChar;
        delete error.number;
        delete error.specialChar;
        delete error.length;
    }

    return error;
};